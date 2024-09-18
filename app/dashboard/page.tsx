import { auth } from '@/auth';
import http from '@/lib/http';

const getDashboard = async (accessToken: string) => {
  try {
    const response = await http.get(
      'http://localhost:8017/v1/dashboards/access',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error) {
    //errror
  }
};
export default async function Dashboard() {
  const session = await auth();
  const accessToken = session?.accessToken as string;
  const response = await getDashboard(accessToken);

  return (
    <div>
      {JSON.stringify(response?.data)}
      <h1>Dashboard Page</h1>
    </div>
  );
}
