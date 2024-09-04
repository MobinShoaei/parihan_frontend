import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Logo: React.FC<{
    link?: boolean;
    width?: number | string;
    height?: string | number;
}> = ({link = true, width = 73, height = 73}) => {
    let data = <Image src="/images/hamcall logo.png" width={width} height={height} alt="logo" objectFit="cover"
                      unoptimized={true}

    />;
    if (link) {
        return <Link href="/">{data}</Link>;
    } else return data;
};
