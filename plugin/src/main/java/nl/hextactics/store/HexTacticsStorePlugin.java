package nl.hextactics.store;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.configuration.ConfigurationSection;
import org.bukkit.plugin.java.JavaPlugin;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.Executors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class HexTacticsStorePlugin extends JavaPlugin {

    private HttpServer server;
    private String apiToken;
    private String prefix;

    @Override
    public void onEnable() {
        saveDefaultConfig();
        loadSettings();
        startHttpServer();
        getLogger().info("HexTacticsStore is ingeschakeld.");
    }

    @Override
    public void onDisable() {
        if (server != null) {
            server.stop(0);
            server = null;
        }
        getLogger().info("HexTacticsStore is uitgeschakeld.");
    }

    private void loadSettings() {
        apiToken = getConfig().getString("security.api-token", "change-this-secret-token");
        prefix = color(getConfig().getString("messages.prefix", "&5&lHexTactics &8» &7"));
    }

    private void startHttpServer() {
        if (server != null) server.stop(0);

        String bind = getConfig().getString("server.bind", "0.0.0.0");
        int port = getConfig().getInt("server.port", 4567);

        try {
            server = HttpServer.create(new InetSocketAddress(bind, port), 0);
            server.createContext("/health", this::handleHealth);
            server.createContext("/deliver", this::handleDeliver);
            server.setExecutor(Executors.newFixedThreadPool(4));
            server.start();
            getLogger().info("HTTP API gestart op " + bind + ":" + port);
        } catch (IOException error) {
            getLogger().severe("Kon HTTP API niet starten: " + error.getMessage());
        }
    }

    private void handleHealth(HttpExchange exchange) throws IOException {
        if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            sendJson(exchange, 405, "{\"ok\":false,\"error\":\"method_not_allowed\"}");
            return;
        }
        sendJson(exchange, 200, "{\"ok\":true,\"service\":\"HexTacticsStore\"}");
    }

    private void handleDeliver(HttpExchange exchange) throws IOException {
        if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            sendJson(exchange, 405, "{\"ok\":false,\"error\":\"method_not_allowed\"}");
            return;
        }

        String token = exchange.getRequestHeaders().getFirst("X-HexTactics-Token");
        if (token == null || !token.equals(apiToken)) {
            sendJson(exchange, 401, "{\"ok\":false,\"error\":\"unauthorized\"}");
            return;
        }

        String body = readBody(exchange);
        String player = extractJsonValue(body, "player");
        String product = extractJsonValue(body, "product");

        DeliveryResult result = deliver(player, product, true);
        if (result.ok()) {
            sendJson(exchange, 200, "{\"ok\":true,\"message\":\"delivered\"}");
        } else {
            sendJson(exchange, 400, "{\"ok\":false,\"error\":\"" + escapeJson(result.message()) + "\"}");
        }
    }

    private DeliveryResult deliver(String player, String product, boolean async) {
        if (!isValidPlayerName(player)) return new DeliveryResult(false, "invalid_player");
        if (product == null || product.isBlank()) return new DeliveryResult(false, "invalid_product");

        String cleanProduct = product.toLowerCase(Locale.ROOT);
        ConfigurationSection section = getConfig().getConfigurationSection("products." + cleanProduct);
        if (section == null) return new DeliveryResult(false, "unknown_product");

        List<String> commands = section.getStringList("commands");
        if (commands.isEmpty()) return new DeliveryResult(false, "no_commands_configured");

        Runnable task = () -> {
            for (String template : commands) {
                String command = template.replace("{player}", player);
                Bukkit.dispatchCommand(Bukkit.getConsoleSender(), command);
            }
            String productName = section.getString("display-name", cleanProduct);
            if (Bukkit.getPlayerExact(player) != null) {
                Bukkit.getPlayerExact(player).sendMessage(prefix + color(getConfig().getString("messages.delivered", "&aJe aankoop is geleverd: &e{product}").replace("{product}", productName)));
            }
            getLogger().info("Bestelling geleverd aan " + player + " product " + cleanProduct);
        };

        if (async) {
            Bukkit.getScheduler().runTask(this, task);
        } else {
            task.run();
        }
        return new DeliveryResult(true, "delivered");
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (!sender.hasPermission("hextacticsstore.admin")) {
            sender.sendMessage(prefix + color(getConfig().getString("messages.no-permission", "&cJe hebt geen permissie.")));
            return true;
        }

        if (args.length == 0) {
            sender.sendMessage(prefix + "Gebruik: /" + label + " reload");
            sender.sendMessage(prefix + "Gebruik: /" + label + " deliver <speler> <product>");
            return true;
        }

        if (args[0].equalsIgnoreCase("reload")) {
            reloadConfig();
            loadSettings();
            startHttpServer();
            sender.sendMessage(prefix + "Config herladen en HTTP API opnieuw gestart.");
            return true;
        }

        if (args[0].equalsIgnoreCase("deliver")) {
            if (args.length < 3) {
                sender.sendMessage(prefix + "Gebruik: /" + label + " deliver <speler> <product>");
                return true;
            }
            DeliveryResult result = deliver(args[1], args[2], false);
            sender.sendMessage(prefix + "Resultaat: " + result.message());
            return true;
        }

        sender.sendMessage(prefix + "Onbekend subcommando.");
        return true;
    }

    private boolean isValidPlayerName(String player) {
        return player != null && player.matches("^[a-zA-Z0-9_.]{3,16}$");
    }

    private String readBody(HttpExchange exchange) throws IOException {
        StringBuilder builder = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) builder.append(line);
        }
        return builder.toString();
    }

    private String extractJsonValue(String json, String key) {
        Pattern pattern = Pattern.compile("\\\"" + Pattern.quote(key) + "\\\"\\s*:\\s*\\\"([^\\\"]*)\\\"");
        Matcher matcher = pattern.matcher(json);
        return matcher.find() ? matcher.group(1) : null;
    }

    private void sendJson(HttpExchange exchange, int status, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        exchange.sendResponseHeaders(status, bytes.length);
        try (OutputStream output = exchange.getResponseBody()) {
            output.write(bytes);
        }
    }

    private String color(String input) {
        return ChatColor.translateAlternateColorCodes('&', input == null ? "" : input);
    }

    private String escapeJson(String input) {
        return input == null ? "" : input.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    private record DeliveryResult(boolean ok, String message) {}
}
