import { ClerkProvider } from "@clerk/nextjs";

function ThemedClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "hsl(222.2 47.4% 11.2%)",
          colorDanger: "hsl(0 84.2% 60.2%)",
          colorSuccess: "hsl(222.2 47.4% 11.2%)",
          colorWarning: "hsl(222.2 47.4% 11.2%)",
          colorNeutral: "hsl(222.2 47.4% 11.2%)",
          colorTextOnPrimaryBackground: "hsl(210 40% 98%)",
          colorTextSecondary: "hsl(222.2 47.4% 11.2%)",
          colorBackground: "hsl(0 0% 100%)",
          borderRadius: "0.5rem",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export { ThemedClerkProvider };
