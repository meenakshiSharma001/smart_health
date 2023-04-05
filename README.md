### 1. Patient Dropdown:
- Displaying all patient names
- Added dropdown to list all patients
- Integrated with '/Patient' API
- Selecting a patient from the dropdown displays the patient information and condition table
- Respective patient info and condition table will be displayed on change of patient from dropdown
- If condition not found, only patient info is displayed without condition table.
### 2. Patient Info:
- Fetching patient information by passing the patient ID i.e '/Patient/${patientId}' API.
### 3. Condition Table:
- Fetching condition table data by passing patient ID i.e '/Condition?patient=${patientId}&clinicalstatus=active'
- On click of Pub Med link, navigating to 'https://pubmed.ncbi.nlm.nih.gov/?term=[condition name]'
### 4. Sorting:
- On click of column header, data is sorted in ascending or descending order for all columns.

#### Packages and Tools used to create this app:

- Visual Studio Code (Code Editor)
- React-table (For condition table)
- React-select (For patient dropdown)
- Axios (For fetching the data)



