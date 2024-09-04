import { useContext } from 'react';
import { useDeviceSelectors } from 'react-device-detect';
import { DeviceContext } from '../common/DeviceProvider';

/*
    Returns true If the screen dimensions are the size of the phone screen
*/

export const useIsMobile = () => {
    const { userAgent } = useContext(DeviceContext);
    const [selectors] = useDeviceSelectors(userAgent as string);
    const { isMobile } = selectors;
    return isMobile;
};
