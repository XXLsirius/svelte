import '@testing-library/jest-dom';
import PlatoonModel from './PlatoonModel';

describe('PlatoonModel unit test', () => {
    let platoons = [{ id: 0, name: "" }];

    it('should fetch platoons and apply filters', async () => {
        await PlatoonModel.getAll({}).then((res) => {
            platoons = res;
        });

        expect(platoons.length).toBeGreaterThan(0);
    });
});
