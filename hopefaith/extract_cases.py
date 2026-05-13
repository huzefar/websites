import pandas as pd
import json

file_path = '/home/huzefar/Downloads/case_details.xlsx'
xls = pd.ExcelFile(file_path)

cases = []

for sheet in xls.sheet_names:
    df = pd.read_excel(file_path, sheet_name=sheet)
    
    # Flatten all text from all cells into a single string
    raw_text_parts = []
    
    # Check headers
    for col in df.columns:
        if 'Unnamed' not in str(col) and pd.notna(col):
            raw_text_parts.append(str(col))
            
    # Iterate rows
    for index, row in df.iterrows():
        for val in row:
            if pd.notna(val) and str(val).strip():
                raw_text_parts.append(str(val).strip())
                
    full_text = " ".join(raw_text_parts)
    
    cases.append({
        'sheet': sheet,
        'raw_text': full_text
    })

with open('parsed_raw_cases.json', 'w') as f:
    json.dump(cases, f, indent=2)

print(f"Successfully extracted {len(cases)} cases into parsed_raw_cases.json")
