import React from 'react';

interface DeviceProviderProps {
    children: React.ReactNode;
    userAgent?: string;
}

export const DeviceContext = React.createContext<{ userAgent?: string }>({});

export const DeviceProvider: React.FC<DeviceProviderProps> = (props) => {
    return (
        <DeviceContext.Provider value={{ userAgent: props.userAgent }}>
            {props.children}
        </DeviceContext.Provider>
    );
};
