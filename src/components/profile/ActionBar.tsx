import { Center } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@material-ui/core';
import React from 'react';

export const ActionBar = () => {

    return (
        <div style={{ paddingTop: '10px' }}>
            <Center>
                <ButtonGroup>
                    <Button>Overview</Button>
                    <Button>Adventures</Button>
                    <Button>Blogs</Button>
                    <Button>Iteneraries</Button>
                </ButtonGroup>
            </Center>
        </div>
    );
};