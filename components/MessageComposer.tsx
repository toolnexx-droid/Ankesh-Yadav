
import React, { useState, useRef } from 'react';
import { MessageSquare, Send, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { generateMarketingMessage } from '../services/geminiService';

export default function MessageComposer() {
  // Form State
  const [campaignName, setCampaignName] = useState('');
  const [numbers, setNumbers] = useState('');
  const [message, setMessage] = useState('');
  const [linkUrl, setLinkUrl] = useState('http://');
  const [callNumber, setCallNumber] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  // Simulation State
  const [isSending, setIsSending] = useState(false);
  const [sendLog, setSendLog] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFile(e.target.files[0]);
    }
  };

  const handleNumbersFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        // Simulate reading file
        const fakeNumbers = "919876543210\n12025550123\n447700900077\n";
        setNumbers(prev => prev + fakeNumbers);
    }
  }

  const handleSend = () => {
    if (!numbers || !message) return;

    setIsSending(true);
    setSendLog([]);
    
    // Simulation of sending process via Backend Virtual Pool
    const steps = [
      `Initiating Campaign: "${campaignName || 'Untitled'}"`,
      "Validating Real User Identity...",
      "Connecting to Backend Virtual Cloud...",
      "Allocating Virtual Numbers from Pool...",
      "Optimizing Route for Delivery...",
      "Sending batch 1 via Virtual Node #882...",
      "Sending batch 2 via Virtual Node #104...",
      "Rotating identities to prevent flagging...",
      "Campaign Completed Successfully!"
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        setIsSending(false);
        setNumbers('');
        setMessage('');
        setCampaignName('');
        setSendLog([]);
        alert("Campaign Sent Successfully!");
      } else {
        setSendLog(prev => [...prev, steps[i]]);
        i++;
      }
    }, 800);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 font-sans">
        {/* Top Notification Bar */}
        <div className="bg-red-50 border-b border-red-100 p-2 text-center">
            <p className="text-red-500 text-sm font-medium">
                NOTE = All campaigns will be delieverd Between 8A.M to 6P.M - (Monday to Saturday) on working days.
            </p>
        </div>

        <div className="p-6">
            {/* Header Section */}
            <div className="flex items-center gap-2 mb-6 text-gray-800">
                <MessageSquare className="fill-current text-gray-700" size={24} />
                <h2 className="text-xl font-bold">Premium WAPP Message</h2>
            </div>

            {/* Campaign Name Input */}
            <div className="flex mb-6">
                <div className="bg-red-400 text-white px-4 py-2 font-medium text-sm flex items-center rounded-l-sm">
                    Campaign Name
                </div>
                <input 
                    type="text"
                    className="flex-1 border border-gray-300 border-l-0 px-4 py-2 rounded-r-sm focus:outline-none focus:ring-1 focus:ring-red-400 text-gray-700"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                />
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
                {/* Left Column: Numbers */}
                <div className="lg:col-span-4 flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                        <label className="font-medium text-gray-700">Numbers:</label>
                        {/* Hidden file input for numbers functionality */}
                        <label className="text-xs text-blue-600 cursor-pointer hover:underline flex items-center gap-1">
                            <Upload size={12} /> Import
                            <input 
                                type="file" 
                                className="hidden" 
                                accept=".csv,.txt,.xlsx" 
                                onChange={handleNumbersFileChange}
                            />
                        </label>
                    </div>
                    <textarea 
                        className="flex-1 w-full border border-green-400 rounded-sm p-3 focus:outline-none focus:border-green-600 min-h-[400px] lg:min-h-[520px] resize-none font-mono text-sm text-gray-600 placeholder-gray-300"
                        placeholder="Enter numbers here... (one per line)"
                        value={numbers}
                        onChange={(e) => setNumbers(e.target.value)}
                    ></textarea>
                </div>

                {/* Right Column: Message & Options */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                    {/* Message Box */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Message:</label>
                        <textarea 
                            className="w-full border border-green-400 rounded-sm p-3 focus:outline-none focus:border-green-600 min-h-[200px] resize-none text-gray-700"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Link & Call Rows */}
                    <div className="border border-gray-200 rounded-sm overflow-hidden">
                        {/* Link Row */}
                        <div className="flex items-center border-b border-gray-200 bg-white">
                            <div className="w-16 bg-gray-100 text-gray-500 text-sm font-medium py-2 px-3 border-r border-gray-200 text-center">
                                Link
                            </div>
                            <div className="w-24 bg-white text-gray-600 text-sm py-2 px-3 border-r border-gray-200 text-center">
                                Visit Now
                            </div>
                            <input 
                                type="text" 
                                className="flex-1 px-3 py-2 text-sm focus:outline-none text-gray-600"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                            />
                        </div>
                         {/* Call Row */}
                        <div className="flex items-center bg-white">
                            <div className="w-16 bg-gray-100 text-gray-500 text-sm font-medium py-2 px-3 border-r border-gray-200 text-center">
                                Call
                            </div>
                            <div className="w-24 bg-white text-gray-600 text-sm py-2 px-3 border-r border-gray-200 text-center">
                                Call Now
                            </div>
                            <input 
                                type="text" 
                                className="flex-1 px-3 py-2 text-sm focus:outline-none text-gray-600"
                                placeholder="10 Digit number"
                                value={callNumber}
                                onChange={(e) => setCallNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Media Upload Section */}
                    <div className="border border-gray-200 rounded-sm mt-2">
                        <div className="bg-sky-400 text-white px-4 py-2 text-sm font-medium">
                            Image/PDF Upload (Max file size 1 MB.)
                        </div>
                        <div className="bg-gray-100 py-6 px-4 text-center border-t border-gray-200">
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange}
                                />
                                {mediaFile ? (
                                    <p className="text-sky-600 font-medium text-sm flex items-center justify-center gap-2">
                                        <CheckCircle size={16}/> {mediaFile.name}
                                    </p>
                                ) : (
                                    <>
                                        <p className="text-gray-600 text-sm">
                                            Drag & Drop image/pdf/Video files(maximum 1)or
                                        </p>
                                        <p className="text-gray-500 underline mt-1 hover:text-gray-700 font-medium text-sm">
                                            Browse Image/PDF/Video
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom Actions */}
                    <div className="mt-4 flex items-center justify-between">
                        <button 
                            onClick={handleSend}
                            disabled={isSending}
                            className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-6 rounded-sm shadow-sm transition-colors disabled:opacity-50"
                        >
                            {isSending ? 'Sending...' : 'Send Now'}
                        </button>

                        {/* Routing Indicator (Small) */}
                        <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                            <AlertTriangle size={12} className="text-yellow-500" />
                            <span>Routing via Backend Pool</span>
                        </div>
                    </div>

                    {/* Active Sending Logs Overlay */}
                    {isSending && (
                         <div className="mt-2 bg-black text-green-400 p-3 rounded text-xs font-mono max-h-32 overflow-y-auto opacity-90">
                             {sendLog.map((log, i) => (
                                <div key={i} className="mb-1">{'>'} {log}</div>
                             ))}
                             <div className="animate-pulse">{'>'} ...</div>
                         </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}
