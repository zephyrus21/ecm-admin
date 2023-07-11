import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

const Root = () => {
  return (
    <main>
      <UserButton afterSignOutUrl='/' />
    </main>
  );
};

export default Root;
