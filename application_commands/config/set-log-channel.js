const Discord = require('discord.js')

module.exports = {
   name: "set-log-channel",
	 description: "Set the log channel for this server",
	 options: [
		 {
			 name: 'channel',
			 description: 'Set the log channel',
			 type: 'CHANNEL',
			 required: true
		 }
	 ],
	 run: async(client, interaction) => {

		 if(!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: 'You dont have enough permissions! (MANAGE_CHANNELS)', ephermal: true})

		 client.db.set(`logchannel_${interaction.guild.id}`, interaction.options.getChannel('channel'))
			 await interaction.reply('Done!')
	
	 }
}