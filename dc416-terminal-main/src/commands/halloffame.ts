import command from '../../config.json' assert {type: 'json'};

const createHallOfFame = (): string[] => {
    const hof: string[] = [];
    const SPACE = "&nbsp;";

    hof.push("<br>");

    if (command.hallOfFame.length === 0) {
        hof.push(SPACE.repeat(2) + "No entries found.");
    } else {
        command.hallOfFame.forEach((handle) => {
            hof.push(SPACE.repeat(2) + handle);
        });
    }

    hof.push("<br>");
    return hof;
}

export const HALLOFFAME = createHallOfFame();
