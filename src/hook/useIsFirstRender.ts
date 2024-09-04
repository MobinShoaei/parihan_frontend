import { useRef } from 'react';
/* 
    Returns true if this render is first 
*/

const useIsFirstRender = (): boolean => {
    const isFirst = useRef<boolean>(true);

    if (isFirst.current) {
        isFirst.current = false;

        return true;
    }

    return isFirst.current;
};

export default useIsFirstRender;
