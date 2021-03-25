import { Message, TextChannel } from 'eris';
import { Error, Success } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class WipeFilesCommand extends BaseCommand {
    constructor() {
        super({
            name: 'wipefiles',
            description: 'Wipe a user\'s files.',
            usage: 'wipefiles <uuid/username/email/invite/key/discord>',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0]) return message.channel.createMessage({
            embed: Error('Provide a user to wipe the files of'),
        });

        try {
            await this.client.api.wipeFiles(message.mentions[0] ? message.mentions[0] .id : args[0]);

            await message.channel.createMessage({
                embed: Success('Wiped user\'s files successfully.'),
            });
        } catch (err) {
            await message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
