import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'draw';

interface Stats {
    wins: number;
    losses: number;
    plays: number;
}

const STORAGE_KEY = 'ogd-rps-stats';
const WIN_TARGET = 3;

const choices: { value: Choice; label: string }[] = [
    { value: 'rock', label: 'Rock' },
    { value: 'paper', label: 'Paper' },
    { value: 'scissors', label: 'Scissors' },
];

function getResult(player: Choice, bot: Choice): Result {
    if (player === bot) return 'draw';
    if (
        (player === 'rock' && bot === 'scissors') ||
        (player === 'paper' && bot === 'rock') ||
        (player === 'scissors' && bot === 'paper')
    ) return 'win';
    return 'lose';
}

function getBotChoice(): Choice {
    const options: Choice[] = ['rock', 'paper', 'scissors'];
    return options[Math.floor(Math.random() * 3)];
}

function loadStats(): Stats {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch { /* ignore */ }
    return { wins: 0, losses: 0, plays: 0 };
}

function saveStats(stats: Stats) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function ChoiceIcon({ choice, className = '' }: { choice: Choice; className?: string }) {
    const base = `${className}`;
    if (choice === 'rock') {
        return (
            <svg viewBox="0 0 64 64" className={base} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="32" cy="34" r="18" />
                <path d="M22 28c2-4 6-6 10-6s8 2 10 6" />
                <circle cx="28" cy="36" r="2" fill="currentColor" />
                <circle cx="36" cy="36" r="2" fill="currentColor" />
            </svg>
        );
    }
    if (choice === 'paper') {
        return (
            <svg viewBox="0 0 64 64" className={base} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="14" y="12" width="36" height="40" rx="3" />
                <line x1="22" y1="24" x2="42" y2="24" />
                <line x1="22" y1="32" x2="42" y2="32" />
                <line x1="22" y1="40" x2="34" y2="40" />
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 64 64" className={base} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="24" cy="20" r="8" />
            <circle cx="40" cy="20" r="8" />
            <line x1="20" y1="26" x2="36" y2="42" />
            <line x1="44" y1="26" x2="28" y2="42" />
        </svg>
    );
}

const resultMessages: Record<Result, string> = {
    win: 'You win this one!',
    lose: 'Bot takes it.',
    draw: "It's a draw.",
};

export default function RpsGame() {
    const [playerWins, setPlayerWins] = useState(0);
    const [botWins, setBotWins] = useState(0);
    const [lastPlay, setLastPlay] = useState<{ player: Choice; bot: Choice; result: Result } | null>(null);
    const [roundOver, setRoundOver] = useState(false);
    const [stats, setStats] = useState<Stats>(loadStats);

    useEffect(() => {
        saveStats(stats);
    }, [stats]);

    const play = useCallback((playerChoice: Choice) => {
        if (roundOver) return;
        const botChoice = getBotChoice();
        const result = getResult(playerChoice, botChoice);

        setLastPlay({ player: playerChoice, bot: botChoice, result });

        if (result === 'win') {
            const newWins = playerWins + 1;
            setPlayerWins(newWins);
            if (newWins >= WIN_TARGET) {
                setRoundOver(true);
                setStats(s => ({ wins: s.wins + 1, losses: s.losses, plays: s.plays + 1 }));
            }
        } else if (result === 'lose') {
            const newBotWins = botWins + 1;
            setBotWins(newBotWins);
            if (newBotWins >= WIN_TARGET) {
                setRoundOver(true);
                setStats(s => ({ wins: s.wins, losses: s.losses + 1, plays: s.plays + 1 }));
            }
        }
    }, [roundOver, playerWins, botWins]);

    const reset = () => {
        setPlayerWins(0);
        setBotWins(0);
        setLastPlay(null);
        setRoundOver(false);
    };

    return (
        <section className="py-32 bg-background">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase mb-6 block font-medium">One More Thing</span>
                    <h2 className="font-serif text-4xl md:text-6xl font-500 mb-4 tracking-tight">Thanks, before you go..</h2>
                    <p className="text-muted text-base md:text-lg max-w-xl mx-auto font-light">
                        How about a quick game? First to {WIN_TARGET} wins. No stakes, just vibes.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* Score indicators */}
                    <div className="flex items-center justify-center gap-8 mb-10">
                        <div className="text-center">
                            <span className="text-xs text-muted uppercase tracking-[0.15em] block mb-2 font-medium">You</span>
                            <div className="flex gap-1.5">
                                {Array.from({ length: WIN_TARGET }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                            i < playerWins ? 'bg-primary' : 'bg-foreground/10'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <span className="text-muted/40 text-sm font-light">vs</span>
                        <div className="text-center">
                            <span className="text-xs text-muted uppercase tracking-[0.15em] block mb-2 font-medium">Bot</span>
                            <div className="flex gap-1.5">
                                {Array.from({ length: WIN_TARGET }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                            i < botWins ? 'bg-muted' : 'bg-foreground/10'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Choice cards */}
                    <div className="flex justify-center gap-4 md:gap-6 mb-10">
                        {choices.map(({ value, label }) => (
                            <button
                                key={value}
                                onClick={() => play(value)}
                                disabled={roundOver}
                                className={`flex flex-col items-center gap-3 p-5 md:p-6 rounded-xl border transition-all duration-300 cursor-pointer
                                    ${roundOver
                                        ? 'border-foreground/[0.04] bg-surface/50 opacity-50 cursor-not-allowed'
                                        : 'border-foreground/[0.06] bg-surface hover:border-primary/20 hover:bg-surface-alt hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_0px_rgba(200,149,108,0.2)]'
                                    }
                                `}
                            >
                                <ChoiceIcon choice={value} className="w-10 h-10 md:w-14 md:h-14 text-foreground/60" />
                                <span className="text-xs text-muted uppercase tracking-[0.12em] font-medium">{label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Result display */}
                    <div className="h-28 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {lastPlay && (
                                <motion.div
                                    key={`${lastPlay.player}-${lastPlay.bot}-${playerWins}-${botWins}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                    className="text-center"
                                >
                                    <div className="flex items-center justify-center gap-6 mb-3">
                                        <div className="flex flex-col items-center gap-1">
                                            <ChoiceIcon choice={lastPlay.player} className="w-8 h-8 text-primary" />
                                            <span className="text-xs text-muted/60">You</span>
                                        </div>
                                        <span className="text-muted/30 text-sm">vs</span>
                                        <div className="flex flex-col items-center gap-1">
                                            <ChoiceIcon choice={lastPlay.bot} className="w-8 h-8 text-muted" />
                                            <span className="text-xs text-muted/60">Bot</span>
                                        </div>
                                    </div>
                                    <p className={`text-sm font-medium ${
                                        lastPlay.result === 'win' ? 'text-primary' :
                                        lastPlay.result === 'lose' ? 'text-muted' : 'text-foreground/50'
                                    }`}>
                                        {roundOver
                                            ? (playerWins >= WIN_TARGET ? 'You won the round!' : 'Bot won this round.')
                                            : resultMessages[lastPlay.result]
                                        }
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Play again button */}
                    {roundOver && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-center mb-10"
                        >
                            <button
                                onClick={reset}
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-lg font-medium text-sm hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_0px_rgba(200,149,108,0.3)] transition-all duration-200 cursor-pointer"
                            >
                                <RotateCcw size={16} />
                                Play Again
                            </button>
                        </motion.div>
                    )}

                    {/* Lifetime stats */}
                    <div className="flex justify-center gap-8 pt-6 border-t border-foreground/[0.06]">
                        <div className="text-center">
                            <span className="text-xl font-serif font-500 text-foreground">{stats.plays}</span>
                            <span className="block text-xs text-muted/60 uppercase tracking-[0.12em] mt-1">Rounds</span>
                        </div>
                        <div className="text-center">
                            <span className="text-xl font-serif font-500 text-primary">{stats.wins}</span>
                            <span className="block text-xs text-muted/60 uppercase tracking-[0.12em] mt-1">Wins</span>
                        </div>
                        <div className="text-center">
                            <span className="text-xl font-serif font-500 text-muted">{stats.losses}</span>
                            <span className="block text-xs text-muted/60 uppercase tracking-[0.12em] mt-1">Losses</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
