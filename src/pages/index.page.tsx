import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const fetchBoard = async () => {
    const res = await apiClient.board.$get().catch(returnNull);
    if (res !== null) {
      setBoard(res);
    }
  };
  const onClick = async (x: number, y: number) => {
    await apiClient.board.$post({
      body: { x, y },
    });
    await fetchBoard();
  };
  useEffect(() => {
    const cancelId = setInterval(fetchBoard, 500);
    return () => {
      clearInterval(cancelId);
    };
  }, []);

  // const [tasks, setTasks] = useState<TaskModel[]>();
  // const [label, setLabel] = useState('');
  // const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
  //   setLabel(e.target.value);
  // };
  // const fetchTasks = async () => {
  //   const tasks = await apiClient.tasks.$get().catch(returnNull);

  //   if (tasks !== null) setTasks(tasks);
  // };
  // const createTask = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!label) return;

  //   await apiClient.tasks.post({ body: { label } });
  //   setLabel('');
  //   await fetchTasks();
  // };
  // const toggleDone = async (task: TaskModel) => {
  //   await apiClient.tasks._taskId(task.id).patch({ body: { done: !task.done } });
  //   await fetchTasks();
  // };
  // const deleteTask = async (task: TaskModel) => {
  //   await apiClient.tasks._taskId(task.id).delete();
  //   await fetchTasks();
  // };

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  if (!board || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((cell, x) => (
              <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
                {cell !== 0 && (
                  <div
                    className={styles.disc}
                    style={{ background: cell === 2 ? '#000' : cell === 1 ? '#fff' : '#ff9d00' }}
                  />
                )}
              </div>
            ))
          )}
        </div>
        {/* <div>{`${turnColor === 2 ? '黒の番です' : '白の番です'}`}</div> */}
      </div>
    </>
  );
};

export default Home;
