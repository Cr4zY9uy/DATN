import { Flex } from 'antd';
import { Outlet, useNavigation } from 'react-router';
import { NavLink } from 'react-router-dom';
import './DetailProduct.css';
import clsx from 'clsx';
import { useState } from 'react';

export const DetailProduct = () => {
    const navigate = useNavigation();

    // State to keep track of the active link
    const [activeLink, setActiveLink] = useState('information');

    // Handler function to set the active link
    const setActive = (link) => {
        setActiveLink(link);
    };

    return (
        <Flex vertical>
            <Flex justify='space-between' className='group_link'>
                <Flex justify='center' align='center' className={clsx('link', activeLink === 'information' && 'active_link')} onClick={() => setActive('information')}>
                    <NavLink
                        to={''}
                        className='information'
                    >
                        Information
                    </NavLink>
                </Flex>
                <Flex justify='center' align='center' className={clsx('link', activeLink === 'comments' && 'active_link')} onClick={() => setActive('comments')} >
                    <NavLink
                        to={'comments'}
                        className='variant'
                    >
                        Comments
                    </NavLink>
                </Flex>
                <Flex justify='center' align='center' className={clsx('link', activeLink === 'ratings' && 'active_link')} onClick={() => setActive('ratings')} >
                    <NavLink
                        to={'ratings'}
                        className='variant'
                    >
                        Ratings
                    </NavLink>
                </Flex>
            </Flex >
            <Outlet />
        </Flex >
    );
};
