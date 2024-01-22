import {action} from "@storybook/addon-actions";
import React from "react";
import {EditableSpan} from "./EditableSpan";

export default {
  title: 'EditableSpan Component',
  component: EditableSpan,
}

const changeTaskTitleCallback = action('Title changed')

export const EditableSpanBaseExample = () => {
  return <EditableSpan title={'start title'} changeTaskTitle={changeTaskTitleCallback}/>

}