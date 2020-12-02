## Reusable Components Documentation

*If you make a component that might be reused in the future please document it here in the following format. Also thank you for making them!*

### **Name**: ___ 
* **File path**: ___
* **Input/Props**: ___
* **Currently in use**: ___
* **Will be used in**: ___
* **Additional info**: ___
_____

### **Name**: TitleAndPen
* **File path**: "src/components/TitleAndPen"
* **Input/Props**: {title, isEditing, setEditingStatus}
* **Currently used in**: emergencyContacts, Manager
* **Will be used in**: Tenants (figma pg 30), Properties (figma pg 49)
* **Additional info**: While isEditing and setEditingStatus can be initiated in the parent scope with useState(), for convience they are in a hook that can be imported by name from the same file. (i.e <import TitleAndPen, { useEditingStatus } from '../components/TitleAndPen';>) \
You would then call it like this: <const { isEditing, setEditingStatus } = useEditingStatus()>

_____

### **Name**: ToggleEditTable
* **File path**: "src/components/ToggleEditTable"
* **Input/Props**: {isEditing, tableData, submitHandler, cancelHandler, validationSchema}
* **Currently used in**: Manager
* **Will be used in**: emergencyContacts (Figma pg. 22), Tenants (Figma pg. 30), Properties (figma pg. 49)
* **Additional info**: Below is a breakdown of each prop to hopefully help make this easy to use! :)

#### isEditing
A boolean that controls if an uneditable table should display, or if the Formik form should display, allowing users to edit the tableData.

#### tableData
tableData is an array of objects. Below is the shape of tableData, and it's array of objects, with a description of each. Getting this correct is super important to making the component work correctly.

```
tableData: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.isRequired,
      inputType: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
    })
  )
```

* **key:** A key name for the field, which should be camel cased. ***Important!*** Make sure that the key of each field you supply matches the key you provide to validationSchema (see below).
* **label:** This string will be used for the input's label
* **value:** This is the initial value for the input. If you wish for there to not be an initial value, use an empty string.
* **inputType:** This identifies what the input type will be (checkbox, number, text, etc.)
* **placeholder:** This is the placeholder text that will be used by the input.

#### submitHandler / cancelHandler
A "Save" and "Cancel" button are generated as part of this component. The submitHandler is sent to the "Save" button's onClick, and cancelHandler is sent to the "Cancel" button's onClick.

submitHandler likely will need to make an API call to save data on the backend, and cancelHandler generally just needs to set isEditing to false.

#### validationSchema
Use [Yup](https://formik.org/docs/guides/validation) to create a validationSchema (this is recommended by Formik). ***Important!*** Make sure that the key of each item matches the key of each field that you supply into tableData.

Note, once Anna's reusable Form component (PR #309) is merged into development, this component should be refactored to utilize it.
_____

### **Name**: Button
* **File path**: "src/components/button"
* **Input/Props**: {type, onClick, isCancelButton, isValidFlag, disabledFlag, children}
* **Currently used in**: RequestItem component, ToggleEditTable component, changePassword view, settings view
* **Will be used in**: 
  1. Login page (figma pg. 1)
  2. Create an account (figma pg. 2)
  3. Terms and Conditions (figma pg. 3)
  4. Dashboard, under "Request for Access" widgit (figma pg. 4)
  5. Request for Access page (figma pg. 6)
  6. Tenants page (figma pg. 7)
  7. Add New Tenant page (figma pg. 11)
  8. Properties page (figma pg. 14)
  9. Add New Property page (figma pg. 15)
  10. Property Managers page (figma pg. 16)
  11. JOIN Staff page (figma pg. 18)
  12. Add new staff member page (figma pg. 19)
  13. Tickets page (figma pg. 20)
  14. Create Emergency Number (figma pg. 23)
  15. Whatever page 39 in Figma docs is? :)
  16. Out of Office page (Figma pg. 53)
  17. Edit Emergency Number page (Figma pg. 54)

* **Additional info**: Below are the propTypes and a breakdown of each to hopefully help make this easy to use! :)

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  isCancelButton: PropTypes.bool,
  isValidFlag: PropTypes.bool,
  disabledFlag: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

#### type
String. This is the type of button it is and should be either button, submit, or reset.

#### onClick
Function. Provide a function to fire when the button is clicked.

#### isCancelButton
Boolean. If true, the button will be styled to look grey-ed out like a cancel button.

#### isValidFlag
Boolean. If true, the button will be clickable. Only applies for buttons where isCancelButton is false. This is mostly handy if you're using the button for a Form and don't want to allow a submission until the form is valid.

#### disabledFlag
Boolean. If true, the button will be disabled. This is handy to prevent users from accidentally firing your onClick function twice.

#### children
String. This is whatever is contained between `<Button>` and `</Button>`. It should be a text string!

_____

### **Name**: Modal 
* **File path**: “src/components/Modal”
* **Input/Props**: {titleText, contentText, hasButtons, yesButtonHandler, noButtonHandler, closeHandler}
* **Currently used in**: ForgotPassword, Dashboard
* **Will be used in**: 
	* Request For Access (figma pg 5)
	* Create an Account (figma pg 26)
	* Add a New Property (figma pg. 35)
	* property managers (figma pg 36)
	* JOIN Staff (figma pg. 38)
	* contact page (figma pg. 51 & 58)
	* and anywhere else that a Modal is needed! :)
* **Additional info**: The only prop that is required is the closeHandler (so that users can actually close the modal!) 
	* Note that if you set hasButtons to true, the button text is “Yes” and “No”. (see figma pg. 5 for an example) 
	* If hasButtons is false, it will display a link stating “Return to Log In” instead. If you need different text here, you'll need to refactor this component to support changing that text.


## **Name**: Toast

* **File path**: src/utils/toast
* **Input/Props**: {txt = '', type = ''}
* **Currently in use**: App, Auth, Manager/index, manager, Settings/index, addEmergencyContact, addProperty, dashboard, emergencyContacts, properties, requestAccess, signup, tenants, tickets
* **Will be used in**: All components requiring toast notifications
* **Additional info**:
    To add a toast notification:

1.  Import "toast.js" from "./src/utils/toast.js". Depending on which file you're working on, you'll likely need to navigate up from your current directory to be able to access the "utils" folder. An example of this could look like `import Toast from '../utils/toast';`
2.  Toast is a function which takes two arguments. The first is the string you would like displayed in the notification. If no text is provided, you will see an error notice in the browser console. The second argument is the type of notification you would like displayed, which dictates the color of the notification. The options for this are "success" (green), "error" (red), "warn" or "warning" (yellow), "info" or "default" (blue). If no second argument is passed, the notification will default to "info" and render a blue toast notification. An example of this could look like `Toast("Property Added!", "success");`

---
### **Name**: CalendarModal
* **File path**: src/components/CalendarModal/CalendarModal
* **Input/Props**: calendarState, title (optional), iconYPosition (optional)
* **Currently in use**: TenantView, AddTenant
* **Will be used in**: Anywhere a two date range is needed
* **Additional info**: 
  1. "calendarState" is structured as follows:
    ```
    {startDate, endDate, setStart, setEnd} = calendarState
    ```
    Only startDate and endDate should ever be accesed (and then read only) the setState funcs are passed automatically to the calendars.
  2. "calendarState" comes from the custom hook provided in the component file.
  3. Calendar icon is set to float:right and may need adjusting on the Y axis. Use iconYPosition to adjust this preferably with rem so it will adjust with text sizing. e.i "-3rem" to shift it up or "4rem" to shift down.
  4. Initialize with 
    ```
    import CalendarModal, {useCalendarState} from '<filepath>/CalendarModal/CalendarModal'
    const calendarState = useCalendarState()
    ```