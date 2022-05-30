import { Button } from '@mantine/core';
import Link from 'next/link';
import { ArrowLeft } from 'tabler-icons-react';

interface IProps {
  pathname: string;
}

export default function BackButton({ pathname }: IProps) {
  return (
    <Link href={pathname} passHref>
      <Button component="a" variant="subtle" color={'red'}>
        <ArrowLeft size={'xs'} />
      </Button>
    </Link>
  );
}
