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




