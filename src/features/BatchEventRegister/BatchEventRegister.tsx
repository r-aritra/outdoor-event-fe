import React, { useRef } from 'react';
import { Group, Text, rem, Button } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import * as XLSX from 'xlsx';

export default function BatchEventRegister(props: Partial<DropzoneProps>) {
  const openRef = useRef<() => void>(null);

  const handleDrop = async (files: File[]) => {
    const file = files[0];

    try {
      // Read the file as a binary string
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;

        // Parse the binary string using xlsx library
        const workbook = XLSX.read(data, { type: 'binary' });

        // Convert the first sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]],
        );

        // Log the resulting JSON data
        console.log('Parsed JSON:', jsonData);
      };

      reader.readAsBinaryString(file);
    } catch (error) {
      console.error('Error parsing file:', error);
    }
  };

  return (
    <>
      {/* "Select files" button outside Dropzone */}
      <Group justify="center" mt="md">
        <Button onClick={() => openRef.current?.()}>Select files</Button>
      </Group>

      {/* Dropzone component */}
      <Dropzone
        onDrop={handleDrop}
        onReject={(rejectedFiles) => console.log('rejected files', rejectedFiles)}
        maxSize={5 * 1024 ** 2}
        accept={MS_EXCEL_MIME_TYPE}
        openRef={openRef}
        {...props}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-blue-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-red-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-dimmed)',
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
    </>
  );
}
