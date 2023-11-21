import '@testing-library/jest-dom';
import DutyModel from './DutyModel';

describe('DutyModel unit test', () => {
    let duties = [{ id: 0, name: "" }];

    it('should fetch duties and apply filters', async () => {
        await DutyModel.getAll({}).then((res) => {
            duties = res;
        });

        expect(duties.length).toBeGreaterThan(0);
    });
});
