import command from '../../config.json' assert {type: 'json'};

const createAbout = (): string[] => {
  const about: string[] = [];

  const SPACE = "&nbsp;";

  const EMAIL = "Email";
  const DISCORD = "Discord";

  const email = `<i class='fa-solid fa-envelope'></i> ${EMAIL}`;
  const discord = `<i class='fa-brands fa-discord'></i> ${DISCORD}`;
  let string = "";

  about.push("<br>");
  about.push(command.aboutGreeting);
  about.push("<br>");
  string += SPACE.repeat(2);
  string += email;
  string += SPACE.repeat(17 - EMAIL.length);
  string += `<a target='_blank' href='mailto:${command.social.email}'>${command.social.email}</a>`;
  about.push(string);

  string = '';
  string += SPACE.repeat(2);
  string += discord;
  string += SPACE.repeat(17 - DISCORD.length);
  string += `<a target='_blank' href='${command.social.discord}'>Discord Server</a>`;
  about.push(string);

  about.push("<br>");
  about.push(`<a href="https://defcontoronto.ca/about.html" target="_blank" class="btn">Learn more about DEFCON Toronto</a>`);

  about.push("<br>");
  return about
}

export const ABOUT = createAbout();
