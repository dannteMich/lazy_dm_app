import React from "react";
import { LoadingSpinner } from "./Loading";

export default {
    title: 'Common/Loading'
}

const Template = (args) => <LoadingSpinner {...args}/>

export const WithoutText = Template.bind({})

export const WithText = Template.bind({})
WithText.args = {
    label: "Loading..."
}

export const WithAboveAndBellowNodes = Template.bind({})
WithAboveAndBellowNodes.args = {
    aboveNode: <div style={{backgroundColor: "pink", width: "500px", margin: "20px auto"}}>
            This is an aboveNode
        </div>,
    bellowNode: <div style={{backgroundColor: "green", width: "500px", margin: "20px auto"}}>
            This is a bellow
        </div>
}