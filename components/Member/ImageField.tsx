import { Group, Text, useMantineTheme, MantineTheme, Image } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';

interface IProps {
  onLoad: (file: File) => void;
  src?: string;
}

export default function ImageField({ onLoad, src }: IProps) {
  const theme = useMantineTheme();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file) {
      onLoad(file);
    }
  }, [file]);

  return (
    <Dropzone
      onDrop={(files) => setFile(files[0])}
      onReject={() =>
        showNotification({
          title: 'Greška pri uploadu fajla.',
          message: 'Dozvoljen je samo upload slika.',
          color: 'red',
        })
      }
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      {(status) => dropzoneChildren(status, theme, file, src)}
    </Dropzone>
  );
}

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme,
  file: File | null,
  src?: string
) => {
  if (src && src.length > 0 && !file) {
    return (
      <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
        <Image src={src} radius="md" alt="Profile pic" />
      </Group>
    );
  }

  if (!file) {
    return (
      <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
        <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    );
  }

  return (
    <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
      <Image src={URL.createObjectURL(file)} radius="md" alt="Profile pic" />
    </Group>
  );
};
