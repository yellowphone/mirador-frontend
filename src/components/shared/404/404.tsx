import React from "react"
import { NavigationBar } from "../navigation-bar/NavigationBar"
import { Image } from "@chakra-ui/react"

export const Page404 = () => {
    return (
        <>
            <NavigationBar/>
            <Image boxSize="400px" src="https://lh3.googleusercontent.com/xBKpGWQaW206YCgVC0A0aFkaEU31zvuZK0leuSeK-InYT1N5PEIm-8Fxd8sbZoHxSiOQX3mgbtg7Rqr31-WMBPMGbDVVR6IUKjtdw2a6Zs3kGnajk7Dv6WFIGddbv9V6hr9vqlqucys=w2400"/>
            <h1>Uh oh! 404! Sorry!</h1>
        </>
    )
}