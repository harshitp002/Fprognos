import React, { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import useDisclaimerStore from '../../store/disclaimer';

const RiskDisclosureDialog = () => {
    const [accepted, setAccepted] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const {terms,updateTerms} = useDisclaimerStore();

    const handleClose = () => setOpenDialog(false);

    const handleSubmit = () => {
        console.log("Terms accepted");
        updateTerms(accepted);
        handleClose(); // Close the dialog
    };

    useEffect(()=>{
       if(!terms.accepted){
        setOpenDialog(true);
       }
    },[])

    return (
        <Dialog open={openDialog} maxWidth="sm" fullWidth sx={{ borderRadius: "10px" }}>
            <div className="text-center text-2xl font-bold text-black bg-gray-200 py-4 rounded-t-lg">
                Risk Disclosures on Derivatives
            </div>
            <div className="flex flex-col space-y-4 space-x-4 mt-4 mb-4">
                <ul className="list-disc pl-8">
                    <li className="text-lg"> {/* Increased text size */}
                        9 out of 10 individual traders in the equity Futures and Options Segment incurred net losses.
                    </li>
                    <li className="text-lg">
                        On average, loss makers registered a net trading loss close to ₹50,000.
                    </li>
                    <li className="text-lg">
                        Loss makers expended an additional 28% of net trading losses as transaction costs.
                    </li>
                    <li className="text-lg">
                        Those making net trading profits incurred between 15% to 50% of such profits as transaction costs.
                    </li>
                </ul>
                <div className="text-sm text-gray-600"> {/* Adjusted text size for source */}
                    Source: SEBI study dated January 25, 2023 on “Analysis of Profit and Loss of Individual Traders dealing in equity Futures and Options (F&O) Segment”, wherein aggregate level findings are based on annual Profit/Loss incurred by individual traders in equity F&O during FY 2021-22.
                </div>
            </div>

            <div className="bg-gray-200 rounded-b-lg py-2 px-4">
                <div className="flex items-center justify-end mt-4">
                    <div className="flex space-x-4">
                        <button
                            onClick={handleSubmit}
                            className={`px-4 py-2 text-white rounded-lg transition duration-200 ${accepted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
                                }`}
                        >
                            I Understand
                        </button>
                    </div>
                </div>
            </div>

        </Dialog>
    );
};

export default RiskDisclosureDialog;
