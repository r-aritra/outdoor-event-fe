import { Group } from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

const Home: React.FC = () => {
  const [cookies] = useCookies(['access_token', 'refresh_token']);
  const [role, serRole] = useState('');

  useEffect(() => {
    if (!cookies.access_token) {
      window.location.href = '/auth';
    }

    const storedUserJSON = localStorage.getItem('user');
    const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;

    serRole(storedUser.roles);
    console.log(`welcome to home screen as ${role}`);
  }, [cookies.access_token]);

  const [excelData, setExcelData] = useState<unknown[]>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    readExcelFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
  });

  const readExcelFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      setExcelData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Group justify="center" align="center" mih={'100vh'} color="black">
      <div>
        <div
          {...getRootProps()}
          style={{
            border: `2px dashed ${isDragActive ? 'green' : '#ccc'}`,
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <input {...getInputProps()} />
          <p>
            {isDragActive
              ? 'Drop the Excel file here...'
              : 'Drag and drop an Excel file here, or click to select one.'}
          </p>
        </div>

        {excelData && (
          <div>
            <h3>Excel Data:</h3>
            <pre>{JSON.stringify(excelData, null, 2)}</pre>
          </div>
        )}
      </div>
    </Group>
  );
};

export default Home;
