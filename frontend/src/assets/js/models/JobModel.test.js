import '@testing-library/jest-dom';
import JobModel from './JobModel';

describe('JobModel unit test', () => {
    let jobs = [{ id: 0, name: "" }];

    it('should fetch jobs and apply filters', async () => {
        await JobModel.getAll({}).then((res) => {
            jobs = res;
        });

        expect(jobs.length).toBeGreaterThan(0);
    });
});
