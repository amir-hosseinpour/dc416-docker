import command from '../../config.json' assert {type: 'json'};

const createEvent = (): string[] => {
    const events: string[] = [];
    const count = `${command.events.length} Event(s)`;
    const SPACE = "&nbsp;";

    events.push("<br>")

    command.events.forEach((ele) => {
        const title = ele[0];
        const speaker = ele[1];
        const description = ele[2].replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
        const url = ele[3];

        let titleLink = `<a href="${url}" target="_blank" class="command">${title}</a>`;

        events.push(SPACE.repeat(2) + titleLink);
        events.push(SPACE.repeat(2) + speaker);
        events.push(SPACE.repeat(2) + description);
        events.push("<br>");
    });

    events.push("<br>");
    events.push(count);
    events.push("<br>");
    return events
}

export const EVENTS = createEvent()
