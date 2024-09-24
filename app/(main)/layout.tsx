interface IMainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout(props: IMainLayoutProps) {
  const { children } = props;

  return <>{children}</>;
}
