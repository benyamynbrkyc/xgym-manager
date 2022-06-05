/* eslint-disable no-param-reassign */
import { Button, SegmentedControl, Space, Stack, Textarea, TextInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { getDownloadURL, uploadBytes } from '@firebase/storage';
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { Gender, Member } from '@/model/Member';
import ImageField from '@/components/Member/ImageField';
import { storageRef } from '@/firebase/config';
import { saveMember } from '@/service/member-service';
import { Timestamp } from 'firebase/firestore';
import { ref } from '@firebase/storage';
import { storage } from '@/firebase/config';

interface IProps {
  onCloseDrawer: () => void;
  member: Member;
}

export default function EditMemberForm({ onCloseDrawer, member }: IProps) {
  const form = useForm<Member>({
    initialValues: {
      ...member,
    },
    validate: {
      firstName: (value) => (value.length > 0 ? null : 'Ime je obavezno'),
      lastName: (value) => (value.length > 0 ? null : 'Prezime je obavezno'),
    },
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = form.onSubmit(async (values: Member) => {
    if (!imageFile)
      return showNotification({
        title: 'Slika je obavezna.',
        message: '',
        color: 'red',
      });

    const id = uuidv4();
    values.id = id;
    values.memberDisplayId = `${values.lastName}-${values.firstName}-${id}`;

    values.imgUrl = await uploadImage(imageFile!, id);
    await saveMember(values, id);
    onCloseDrawer();
    showNotification({
      message: 'Član je uspješno uređen.',
      color: 'green',
    });
  });

  const uploadImage = async (file: File, id: string): Promise<string> => {
    const imageRef = ref(storage, `member_images/${id}`);
    const snapshot = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput required label="Prezime" {...form.getInputProps('lastName')} />
        <TextInput required label="Ime" {...form.getInputProps('firstName')} />
        <TextInput
          required
          label="Broj licne"
          placeholder=""
          {...form.getInputProps('idCardNumber')}
        />
        <DatePicker
          placeholder=""
          label="Datum rođenja"
          required
          dropdownType="modal"
          {...form.getInputProps('dateOfBirth')}
        />
        <SegmentedControl
          {...form.getInputProps('gender')}
          data={[
            {
              label: 'Žensko',
              value: Gender.FEMALE.toString(),
            },
            {
              label: 'Muško',
              value: Gender.MALE.toString(),
            },
          ]}
        />
        <Textarea
          autosize
          maxRows={5}
          minRows={2}
          placeholder="Aleja ljiljana bb 74250 ..."
          label="Adresa"
          {...form.getInputProps('address')}
        />
        <TextInput
          placeholder="+387 12 345 6789"
          label="Telefon"
          {...form.getInputProps('phone')}
        />
        <TextInput placeholder="email@email.com" label="Email" {...form.getInputProps('email')} />
        <TextInput placeholder="Grupa 1" label="Grupa" {...form.getInputProps('group')} />
        <TextInput placeholder="Mecava" label="Trener" {...form.getInputProps('trainer')} />
        <TextInput placeholder="Paket 1" label="Paket" {...form.getInputProps('package')} />
        <Textarea
          autosize
          maxRows={5}
          minRows={2}
          placeholder="Informacije o klijentu"
          label="Info"
          {...form.getInputProps('info')}
        />
        <ImageField onLoad={(file) => setImageFile(file)} src={member.imgUrl} />
        {!imageFile || (!member.imgUrl && <Text color="red">* Slika je obavezna</Text>)}
        <>
          <Space h="lg" />
          <Button type="submit" variant="filled" color="red">
            Uredi člana
          </Button>
        </>
      </Stack>
    </form>
  );
}
