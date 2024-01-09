import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Group, Text, rem, Button, Box } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import * as XLSX from 'xlsx';
import { DateInput } from '@mantine/dates';
import { IconCalendarEvent } from '@tabler/icons-react';
import { Notification } from '@mantine/core';

const BatchEventRegister: React.FC = (props: Partial<DropzoneProps>) => {
  const openRef = useRef<() => void>(null);
  const { t } = useTranslation();

  const handleDrop = async (files: File[]) => {
    const file = files[0];

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;

        const workbook = XLSX.read(data, { type: 'binary' });

        const jsonData = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]],
        );

        console.log('Parsed JSON:', jsonData);
      };

      reader.readAsBinaryString(file);
    } catch (error) {
      console.error('Error parsing file:', error);
    }
  };

  return (
    <>
      <Box>
        <Text size="xl" fw={700}>
          {t('batchEventRegister.title')}
        </Text>

        <Notification title={t('batchEventRegister.notification.title')}>
          {t('batchEventRegister.notification.content')}
        </Notification>

        <Group mt="md" mb="20px" style={{ justifyContent: 'space-between' }}>
          <DateInput
            miw={144}
            maw={400}
            placeholder={t('batchEventRegister.dateInput.placeholder')}
            rightSectionWidth={40}
            rightSection={<IconCalendarEvent />}
          />
          <Button onClick={() => openRef.current?.()}>
            {t('batchEventRegister.selectFiles')}
          </Button>
        </Group>

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
                {t('batchEventRegister.dragImagesHere')}
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                {t('batchEventRegister.attachFilesInfo')}
              </Text>
            </div>
          </Group>
        </Dropzone>
      </Box>
    </>
  );
};

export default BatchEventRegister;
