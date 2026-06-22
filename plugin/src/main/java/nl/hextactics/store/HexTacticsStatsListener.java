package nl.hextactics.store;

import org.bukkit.Bukkit;
import org.bukkit.Statistic;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.entity.PlayerDeathEvent;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;

public final class HexTacticsStatsListener implements Listener {

    private final HexTacticsStorePlugin plugin;

    public HexTacticsStatsListener(HexTacticsStorePlugin plugin) {
        this.plugin = plugin;
    }

    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        plugin.sendPublicDiscordEmbed(
                "discord.joins-webhook-url",
                "👋 Speler joined",
                "**" + player.getName() + "** is HexTactics gejoined.",
                2263842,
                player.getName()
        );
        plugin.scheduleOnlineStatusUpdate();
    }

    @EventHandler
    public void onQuit(PlayerQuitEvent event) {
        Player player = event.getPlayer();
        plugin.sendPublicDiscordEmbed(
                "discord.joins-webhook-url",
                "🚪 Speler left",
                "**" + player.getName() + "** heeft HexTactics verlaten.",
                16753920,
                player.getName()
        );
        plugin.scheduleOnlineStatusUpdate();
    }

    @EventHandler
    public void onDeath(PlayerDeathEvent event) {
        Player player = event.getEntity();
        String message = event.getDeathMessage() == null ? player.getName() + " is dood gegaan." : event.getDeathMessage();
        plugin.sendPublicDiscordEmbed(
                "discord.stats-webhook-url",
                "💀 Player death",
                message + "\n\nKills: `" + player.getStatistic(Statistic.PLAYER_KILLS) + "` | Deaths: `" + player.getStatistic(Statistic.DEATHS) + "`",
                10038562,
                player.getName()
        );
    }

    public static String onlinePlayersText() {
        if (Bukkit.getOnlinePlayers().isEmpty()) return "Geen spelers online.";
        StringBuilder builder = new StringBuilder();
        for (Player player : Bukkit.getOnlinePlayers()) {
            if (!builder.isEmpty()) builder.append(", ");
            builder.append(player.getName());
        }
        return builder.toString();
    }
}
