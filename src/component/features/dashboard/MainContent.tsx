import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Card } from '../../Card';
import { AlgoTable } from './AlgoTable';
import TopFilterBar from './FilterBar';

export const MainContent = () => {
    const { pnlCards, totalPNL } = useSelector((state: RootState) => state.dashboard);
    const [selectedDay, setSelectedDay] = useState("Thursday");
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="flex-1 p-4 space-y-6  overflow-auto">
            <div className="overflow-x-auto scroll-smooth no-scrollbar">
                <div className="flex gap-4 mb-6 min-w-max">
                    {pnlCards.map((card, index) => (
                        <Card key={index} id={card.id} pnl={card.pnl} />
                    ))}
                </div>
            </div>

            {/* Top Filter Bar */}
            <TopFilterBar
                selectedDay={selectedDay}
                onDayChange={setSelectedDay}
                totalPNL={`₹${totalPNL.toLocaleString()}`}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
            />

            {/* Algo Table */}
            <AlgoTable />
        </div>
    );
};

