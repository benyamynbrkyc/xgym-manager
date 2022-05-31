/* eslint-disable no-param-reassign */
import { Button, SegmentedControl, Space, Stack, Textarea, TextInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { getDownloadURL, uploadBytes } from '@firebase/storage';
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { Gender, Member } from '@/model/Member';
import ImageField from '@/components/Members/AddMember/ImageField';
import { storageRef } from '@/firebase/config';
import { saveMember } from '@/service/member-service';
import { Timestamp } from 'firebase/firestore';
import { ref } from '@firebase/storage';
import { storage } from '@/firebase/config';

export default function AddMemberForm() {
  const form = useForm<Member>({
    initialValues: {
      id: '',
      memberDisplayId: '',
      firstName: '',
      lastName: '',
      idCardNumber: '',
      dateOfBirth: Timestamp.now(),
      gender: Gender.FEMALE,
      address: '',
      phone: '',
      group: '',
      email: '',
      trainer: '',
      info: '',
      imgUrl: '',
      package: '',
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
        />
        <TextInput placeholder="+387 12 345 6789" label="Telefon" />
        <TextInput placeholder="email@email.com" label="Email" />
        <TextInput placeholder="Grupa 1" label="Grupa" />
        <TextInput placeholder="Mecava" label="Trener" />
        <Textarea
          autosize
          maxRows={5}
          minRows={2}
          placeholder="Informacije o klijentu"
          label="Info"
        />
        <ImageField onLoad={(file) => setImageFile(file)} />
        {!imageFile && <Text color="red">* Slika je obavezna</Text>}
        <>
          <Space h="lg" />
          <Button type="submit" variant="filled" color="red">
            Dodaj clana
          </Button>
        </>
      </Stack>
    </form>
  );
}
