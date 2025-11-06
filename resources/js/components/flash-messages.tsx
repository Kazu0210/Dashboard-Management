import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

interface FlashMessage {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
}

export default function FlashMessages() {
    const page = usePage();
    const flash = (page.props as any).flash as FlashMessage | undefined;
    const [messages, setMessages] = useState<FlashMessage>({});

    useEffect(() => {
        setMessages(flash || {});
    }, [flash]);

    const dismissMessage = (type: keyof FlashMessage) => {
        setMessages(prev => ({ ...prev, [type]: undefined }));
    };

    const renderMessage = (type: keyof FlashMessage, message: string) => {
        const icons = {
            success: <CheckCircle className="w-5 h-5" />,
            error: <XCircle className="w-5 h-5" />,
            warning: <AlertTriangle className="w-5 h-5" />,
            info: <Info className="w-5 h-5" />
        };

        const styles = {
            success: 'bg-green-50 border-green-200 text-green-800',
            error: 'bg-red-50 border-red-200 text-red-800',
            warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
            info: 'bg-blue-50 border-blue-200 text-blue-800'
        };

        return (
            <div key={type} className={`border rounded-md p-4 ${styles[type]} mb-4`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {icons[type]}
                        <span className="ml-2 font-medium">{message}</span>
                    </div>
                    <button
                        onClick={() => dismissMessage(type)}
                        className="ml-4 inline-flex text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-2">
            {messages.success && renderMessage('success', messages.success)}
            {messages.error && renderMessage('error', messages.error)}
            {messages.warning && renderMessage('warning', messages.warning)}
            {messages.info && renderMessage('info', messages.info)}
        </div>
    );
}