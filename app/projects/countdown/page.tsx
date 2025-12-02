"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import CountdownDisplay from "@/components/countdown/CountdownDisplay";
import LapList from "@/components/countdown/LapList";
import LapChart from "@/components/countdown/LapChart";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";

interface Lap {
    id: number;
    timeRemaining: number;
    difference: number;
    timestamp: any;
}

export default function CountdownPage() {
    const { user } = useAuth();
    const [targetDate, setTargetDate] = useState<number>(new Date("2025/12/31 23:59:59").getTime());
    const [timeLeft, setTimeLeft] = useState(0);
    const [laps, setLaps] = useState<Lap[]>([]);
    const [loading, setLoading] = useState(true);

    // Load data from Firestore
    useEffect(() => {
        const loadData = async () => {
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid, "projects", "project1");
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setTargetDate(data.targetDate);
                        setLaps(data.laps || []);
                    }
                } catch (error) {
                    console.error("Error loading data:", error);
                }
            }
            setLoading(false);
        };

        loadData();
    }, [user]);

    const handleTick = (time: number) => {
        setTimeLeft(time);
    };

    const handleLap = async () => {
        const lastLap = laps[laps.length - 1];
        const difference = lastLap ? lastLap.timeRemaining - timeLeft : 0;

        const newLap: Lap = {
            id: laps.length + 1,
            timeRemaining: timeLeft,
            difference: difference,
            timestamp: new Date(),
        };

        const newLaps = [...laps, newLap];
        setLaps(newLaps);

        if (user) {
            try {
                const docRef = doc(db, "users", user.uid, "projects", "project1");
                await updateDoc(docRef, {
                    laps: newLaps,
                    lapCount: newLaps.length,
                    lastActivity: serverTimestamp(),
                });
            } catch (error) {
                console.error("Error saving lap:", error);
            }
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Countdown Timer
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Track time and record laps.
                    </p>
                </div>

                <CountdownDisplay targetDate={targetDate} onTick={handleTick} />

                <div className="mt-8 flex justify-center space-x-4">
                    <button
                        onClick={handleLap}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Flag className="mr-2 h-5 w-5" />
                        Lap
                    </button>
                </div>

                {laps.length > 5 && <LapChart laps={laps} />}

                {laps.length > 0 && <LapList laps={laps} />}
            </div>
        </div>
    );
}
