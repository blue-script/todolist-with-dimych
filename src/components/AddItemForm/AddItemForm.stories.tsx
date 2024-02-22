import {AddItemForm} from "./AddItemForm";
import { action } from "@storybook/addon-actions";

export default {
  title: 'AddItemForm Component',
  component: AddItemForm,
}

const callback = action('Button "add" was pressed iside the form')

export const AddItemFormBaseExample = () => {
  return <AddItemForm addItem={callback}/>
}
export const AddItemFormDisabledExample = () => {
  return <AddItemForm addItem={callback} disabled={true}/>
}