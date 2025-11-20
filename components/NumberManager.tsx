
import React, { useState } from 'react';
import { Smartphone, Save, CheckCircle, Shield, Server, Lock } from 'lucide-react';

export default function NumberManager() {
  const [realNumber, setRealNumber] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!realNumber) return;
    
    setIsConnecting(true);
    // Simulate verification process
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setRealNumber('');
    setIsConnected(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Device Connection
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Link your real WhatsApp number to authorize the backend delivery system.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isConnected ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
              <Smartphone size={24} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Real Number Identity</h3>
              <p className="text-sm text-gray-500">
                {isConnected ? 'Device Linked & Authorized' : 'No Device Connected'}
              </p>
            </div>
          </div>
          {isConnected && (
             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 gap-1">
               <CheckCircle size={12} />
               Verified
             </span>
          )}
        </div>

        <div className="p-8">
          {!isConnected ? (
            <form onSubmit={handleConnect} className="max-w-md">
              <label htmlFor="realNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your Real WhatsApp Number
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  +
                </span>
                <input
                  type="tel"
                  name="realNumber"
                  id="realNumber"
                  className="flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-md focus:ring-wa focus:border-wa sm:text-sm border-gray-300"
                  placeholder="1 (555) 987-6543"
                  value={realNumber}
                  onChange={(e) => setRealNumber(e.target.value)}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 mb-6">
                We will send a verification ping to this number to authorize your account.
              </p>
              <button
                type="submit"
                disabled={isConnecting || !realNumber}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wa hover:bg-wa-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wa disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isConnecting ? 'Verifying...' : 'Connect & Verify'}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-0.5" size={20} />
                <div>
                  <h4 className="text-sm font-medium text-green-800">Connected: +{realNumber}</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your real identity is active. You can now send campaigns.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Backend Status</h4>
                <div className="grid md:grid-cols-2 gap-4">
                   <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-3">
                     <Server className="text-blue-500" />
                     <div>
                       <p className="text-xs text-gray-500">Sending Protocol</p>
                       <p className="text-sm font-medium text-gray-900">Virtual Number Pool</p>
                     </div>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-3">
                     <Lock className="text-wa" />
                     <div>
                       <p className="text-xs text-gray-500">Identity Masking</p>
                       <p className="text-sm font-medium text-gray-900">Enabled (Backend Managed)</p>
                     </div>
                   </div>
                </div>
              </div>

              <button 
                onClick={handleDisconnect}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Disconnect this number
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3 border border-blue-100">
        <Shield className="text-blue-600 mt-1" size={20} />
        <div>
           <h4 className="font-medium text-blue-900 text-sm">How it works</h4>
           <p className="text-blue-800 text-sm mt-1">
             You manage your <strong>Real Number</strong> here for account identity. 
             When you send messages, our system automatically routes them through our 
             <strong> Backend Virtual Number Pool</strong> to ensure high delivery rates and protect your real number from bans. 
             You do not need to manage these virtual numbers manually.
           </p>
        </div>
      </div>
    </div>
  );
}
