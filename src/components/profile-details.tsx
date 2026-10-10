"use client";

import { Avatar, Button, Card, FieldError, Input, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";
import { authClient } from "@/lib/auth-client";

type Props = {
  user: { name: string; email: string; image?: string | null };
  lang: Lang;
};

// The profile page: user picture, name, email, sign out button and the "update name" form
export default function ProfileDetails({ user, lang }: Props) {
  const t = texts[lang];
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    await authClient.signOut();
    toast.success(t.signedOut);
    router.push("/");
    router.refresh();
  }

  // change the name with Better Auth
  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setNameError(t.nameRequired);
      return;
    }
    setNameError("");

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error(t.updateFailed);
      return;
    }
    toast.success(t.profileUpdated);
    router.refresh(); // show the new name in the page and in the navbar
  }

  return (
    <div className="flex flex-col gap-6">
      {/* picture, name, email and sign out */}
      <Card className="flex-col gap-4 rounded-2xl border border-border p-6 shadow-none sm:flex-row sm:items-center">
        <Avatar size="lg" className="h-[70px] w-20 rounded-2xl">
          {user.image && <Avatar.Image alt={user.name} src={user.image} />}
          <Avatar.Fallback className="rounded-2xl text-3xl">{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="truncate text-xl leading-7 font-semibold">{user.name}</p>
          <p className="truncate">{user.email}</p>
        </div>

        <Button variant="danger-soft" className="h-10 border border-danger bg-transparent" onPress={handleSignOut}>
          ↩ {t.signOut}
        </Button>
      </Card>

      {/* the form to change the name */}
      <Card className="gap-3 rounded-2xl border border-border p-5 shadow-none">
        <h2 className="text-lg leading-7 font-semibold">{t.infoTitle}</h2>

        <form onSubmit={handleUpdate} noValidate className="flex flex-col gap-4 sm:p-6">
          <TextField value={name} onChange={setName} isInvalid={nameError !== ""}>
            <Label className="leading-[21px]">{t.nameLabel}</Label>
            <Input className="h-10" />
            <FieldError>{nameError}</FieldError>
          </TextField>

          <Button type="submit" fullWidth isDisabled={loading} className="h-10">
            {loading ? t.pleaseWait : t.updateButton}
          </Button>
        </form>
      </Card>
    </div>
  );
}
