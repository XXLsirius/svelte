import '@testing-library/jest-dom';
import DepartmentModel from './DepartmentModel';

describe('DepartmentModel unit test', () => {
    let departments = [{ id: 0, name: "" }];

    it('should fetch departments and apply filters', async () => {
        await DepartmentModel.getAll({}).then((res) => {
            departments = res;
        });

        expect(departments.length).toBeGreaterThan(0);
    });
});
