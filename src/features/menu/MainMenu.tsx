import { DeskAssigner } from "../deskAssigner/components/DeskAssigner";
import { DeskList } from "../desks/components/DeskList";
import { EmployeesList } from "../employees/components/EmployeesList";

export const MainMenu = () => {
  return (
    <div>
      <div>Main Menu</div>
      <div>--------------</div>
      <div>DESK LIST</div>
      <div>--------------</div>
      <DeskList />
      <div>--------------</div>
      <div>EMPLOYEES LIST</div>
      <div>--------------</div>
      <EmployeesList />
      <div>--------------</div>
      <div>ALGO</div>
      <div>--------------</div>
      <DeskAssigner />
    </div>
  );
};
