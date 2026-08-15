Dim vExcel
Dim vCSV
Set vExcel = CreateObject("Excel.Application")
Set vCSV = vExcel.Workbooks.Open(Wscript.Arguments.Item(0))
vCSV.SaveAs WScript.Arguments.Item(0) & ".csv", 6
vCSV.Close False
vExcel.Quit