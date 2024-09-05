import * as REC from "@react-email/components";

type Props = { title: string; btnLabel: string; username: string; token: string };

export const AuthEmailTemplate = ({ title, btnLabel, username, token }: Props) => (
  <REC.Html>
    <REC.Head />
    <REC.Preview>{title}</REC.Preview>
    <REC.Body style={styles.main}>
      <REC.Container style={styles.container}>
        <REC.Heading style={styles.h1}>Welcome, {username}!</REC.Heading>
        <REC.Section style={styles.buttonContainer}>
          <REC.Button style={styles.button} href={token}>
            {btnLabel}
          </REC.Button>
        </REC.Section>
        <REC.Text style={styles.text}>
          If the button doesn't work, you can also copy and paste this link into your browser:
        </REC.Text>
        <REC.Text style={styles.link}>
          <REC.Link href={token} style={styles.link}>
            {token}
          </REC.Link>
        </REC.Text>
      </REC.Container>
    </REC.Body>
  </REC.Html>
);

const styles = {
  main: {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    padding: "40px 0",
  },

  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "40px",
    maxWidth: "600px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },

  h1: {
    color: "#333",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "0 0 30px",
  },

  text: {
    color: "#333",
    fontSize: "16px",
    lineHeight: "26px",
    textAlign: "left" as const,
    marginBottom: "20px",
  },

  buttonContainer: {
    textAlign: "center" as const,
    margin: "30px 0",
  },

  button: {
    backgroundColor: "#5469d4",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "12px 24px",
    cursor: "pointer",
  },

  link: {
    color: "#5469d4",
    textDecoration: "underline",
    wordBreak: "break-all" as const,
  },

  hr: {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  },

  footer: {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center" as const,
    marginTop: "20px",
  },
};
