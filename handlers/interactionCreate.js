module.exports = async (client) => {
	const DB = require('../Schemas/CustomCommandDB')
	const db = require('quick.db')
	const blacklisted = require('../database/blacklisted.json')
  client.on('interactionCreate', async interaction => {
    if(interaction.isCommand()) {
     const slash_commands = client.slashcommands.get(interaction.commandName);


			if(slash_commands) {

			if(blacklisted.includes(interaction.user.id)) {
				const embed = new client.Discord.MessageEmbed()
				.setTitle('<:Tekno_StickerSad:951526699626012702> Oops!')
				.setDescription('It seems you are **blacklisted** from using our bot!\n\nIf you wish to be unblacklisted, join our [support server](https://discord.gg/6MJcggvnvq), read the [rules](https://discord.com/channels/894164132100730880/911569613861568612/950020886654763038) and ask in [support](https://discord.com/channels/894164132100730880/894164132553699395/951885075585310771) and why you should get unblacklisted.')
				.setColor('#2f3136')

				interaction.reply({embeds: [embed], ephemeral: true})
			} else {
      slash_commands.run(client, interaction);
			db.add('usage', 1)
			const embed = new client.Discord.MessageEmbed()
			.setTitle('Interaction (/) command ran')
			.setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({format: 'png', dynamic: true}))
			.addField('Interaction Author', `\`\`\`${interaction.user.tag}\`\`\``)
			.addField('Command Name', `\`\`\`${interaction.commandName}\`\`\``)
			.addField('Guild Name', `\`\`\`${interaction.guild.name}\`\`\``)
			.addField('Guild ID', `\`\`\`${interaction.guild.id}\`\`\``)
			.addField('Channel Name', `\`\`\`${interaction.channel.name}\`\`\``)
			.addField('Channel ID', `\`\`\`${interaction.channel.id}\`\`\``)
			.setTimestamp()
			.setColor('#2f3136')
			client.channels.cache.get('894164132704714765').send({embeds: [embed]})
			}
			} else {
				// CUSTOM COMMANDS

				const command = await DB.findOne({commandName: interaction.commandName})

				interaction.reply({content: `${command.Response ? command.Response : 'No Response found'}`})
				console.log(command)
			}
		}

  })
}