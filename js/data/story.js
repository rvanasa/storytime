/* global angular */

angular.module('app')

.factory('Story', function(StoryBuilder)
{
	var story = StoryBuilder();
	
	story.define('start', `You find yourself on a plateau overlooking {loc:main}.`)
		.set('steed:main', 'horse')
		.path(`Why me?`, 'identityCrisis')
		.path(`I'm ready to do what I came for.`, 'ready')
		.end();
	
	story.define('die', `<h3>You died.</h3>`)
		.path(`Fair enough.`, 'start')
		.path(`I know I made my mistakes, but I'm ready to start a new life for myself.`, 'start')
		.path(`Death is the only certainty in life.`, 'start')
		.end();
	
	story.define('nothing', `~ Nothing happens ~`)
		.path(`Well, at least I tried.`, null)
		.end();
	
	story.define('identityCrisis', `Why am I even here?`)
		.path(`Mope silently`, 'ready')
		// .path(`Wander off, blinded by your own tears`, 'bunny') -- gonna move this
		.end();
	
	story.define('bunny', `You wander far away, still blind.`)
		.path(`Wipe your tears`, 'bunnyVillage')
		.path(`Let the tears rain down like an emotion ocean`, 'bunnyTrip')
		.end();
	
	story.define('bunnyVillage', `Your tears led you to {bunnyTown}: a village entirely ran by bunnies!`)
		.path (`Where are the leaders of the land?`, 'bunnyElder')
		.path (`I shall colonize this {adj} bunny village!`, 'intruder')
		.path(`Marvel at their technologies and keep looking`, 'bunnyCult')
		.end();
		
		story.define('bunnyCult', `You see a few bunnies chanting the word "{interjection}!" in a circle around a {color} fire.`)
		
	story.define('bunnyTrip', `You trip over a bunny and the dirt absorbs your tears.`)
		.path(`Check on the poor bunny.`, 'bunnyTalk')
		.path(`Kick the bunny to see if it's still alive.`, 'intruder')
		.end();
		
	story.define('intruder', `Dust and rock swirl in the air and the satanic God of the bunnies claims your soul for intruding the peaceful lives of these bunnies.`)
		.path(`Learn that the moral of this story is to leave wild bunnies alone, and die.`, 'die')
		.end();
		
	story.define('bunnyElder', `Tis I, the great {char:bunny}.`)
		.path (`Make fun of his name`, 'intruder')
		.path (`Ask for a quest`, 'bunnyQuest')
		.end();
		
	story.define('bunnyTalk', `You pick up the bunny and it says,"Thank you, gentle soul. You are the chosen one. I have a quest, if you choose to accept it."`)
		.path(`Accept the quest, no matter how weird, because you're already talking to a bunny`, 'bunnyQuest')
		.path(`Deny the bunny by drop-kicking it`, 'intruder')
		.end();
		
	story.define('bunnyQuest', `The talking bunny gives you a {color:main} letter that reads, "Bunnies are small, no one listens to bunnies. Be our voice in the magical creature senate in {town:senate}. Go there now!"`)	
		.path(`You get pumped, punch a wall, and listen to some badass hero music as you walk away, {adj}.`, 'bunnyWait')
		.path(`Run there as fast as you can`, 'run')
		.end();
		
	story.define('bunnyWait', `Wait! Don't walk like a {adj} idiot! Take our {steed:main}!`)
		.path(`Take the {steed:main}.`, 'steed')
		.path(`You're terrified of horses so you walk {adj:main} anyway.`, 'road')
		.end();
	
	story.define('ready', `You contemplate the situation.`)
		.path(`Let's do this the old-fashioned way.`, 'steed')
		.path(`Hey look, a bird.`, 'bird')
		.end();
	
	story.define('steed', `You mount your steed and gallop onward.`)
		.path(`Yeehaw.`, 2)
		.path(`I did't sign up for this.`, 'steedDismount')
		.end();
	
	story.define('steed2', `Giddy up {char:steed}!`)
		.path(`Why did I name my {steed:main} {char:steed}?`, 3)
		.end();
	
	story.define('steed3', `{char:steed} twists his head around, grinning. "Only ask questions that you know have answers."`)
		.path(`It's a philosophical {steed:main}!`, 4)
		.path(`It's an idiot.`, 'steedKick')
		.path(`Forget this.`, 'steedDismount')
		.end();
	
	story.define('steed4', `"So you see here, kid. The world works in strange ways, and you need to be on the top of the sandwich to enjoy the slide, if you get what I'm saying. {int:steed}"`)
		.path(`Keep listening`, 5)
		.end();
	
	story.define('steed5', `"Right now it may seem as though you've been dropped into a land devoid of meaning, of purpose, and of {adj} {steed:main}s. {int:steed} But I can assure you that one day you will understand that before you can begin {goodAct:main}, you'd better discover your true nature by {evilAct:main}."`)
		.path(`Keep listening`, 6)
		.path(`Hold up. Are you asking me to start {evilAct:main}?`, 7)
		.end();
	
	story.define('steed6', `"Yessir. Deal with it. {int:steed}"`)
		.path(`Keep listening`, 7)
		.end();
	
	story.define('steed7', `"{int:steed} Before you start a garden you have to cut the weeds, and before you cut the weeds you have to be {evilAct:main}."`)
		.path(`Alright, I'm getting a new {steed:main}.`, 'steedKick')
		.end();
	
	story.define('steedKick', `{int:steed} The {steed:main} suddenly bucks you off, and you faceplant into the dusty road.`)
		.path(`I think my neck is broken.`, 'help')
		.path(`Regardless of whether my neck is broken, I still need help.`, 'help')
		.path(`I don't like this whole '{steed:main}' thing. I'm more of a {steed:next} person.`, 'steedChange')
		.path(`Start crying`, 'cry')
		.end();
	
	story.define('steedDismount', `You dismount and glumly seat yourself on a rock.`)
		.path(`What am I doing?`, 'identityCrisis')
		.path(`Hey look, it's that bird again!`, 'birdLeave')
		.end();
	
	story.define('steedChange', `~ A ripple in space-time opens a portal through which a herd of {steed:main}-like creatures descend into {loc:main} ~`)
		.set('steed:main', '{steed:next}')
		.set('steed:next', '{steed}')
		.path(`Now we're talking.`, 'start')
		.end();
	
	story.define('help', `You call for help in a pitiful, {adj:helpVoice} voice.`)
		.path(`Keep yelling`, 2)
		.path(`Give up and die`, 'die')
		.path(`Heal yourself, since you're Cat-Jesus`, 'heal', {'char:main': 'Cat-Jesus'})
		.end();
	
	story.define('help2', `Nothing yet.`)
		.path(`Listen for a while`, 3)
		.path(`Start crying`, 'cry')
		.path(`Yell louder and with extra {adj:helpVoice} gusto`, 3)
		.path(`Give up and die`, 'die')
		.end();
	
	story.define('help3', `You hear voices over a hill.`)
		.path(`Keep yelling`, ['nomad', 'paparazzi', 'catJesus'])
		.path(`Give up and die`, 'die')
		.end();
	
	story.define('heal', `~ Ancient chanting resonates around you as your physical body is mended ~`)
		.path(`Wander away in a trance`, 'road')
		.end();
	
	story.define('nomad', `It's a group of nomads! They're probably cannibals.`)
		.path(`They might not be cannibals.`, 2)
		.path(`Die before they eat you`, 'die')
		.end();
	
	story.define('nomad2', `~ The nomads stare at you for a while ~`)
		.path(`Don't eat me!`, 3)
		.path(`Eat me, and get it over with!`, 4)
		.end();
	
	story.define('nomad3', `A small child walks out of the group and pokes you with a stick.`)
		.path(`Say nothing`, 4)
		.path(`Cry`, 'cry')
		.end();
	
	story.define('nomad4', `"You're too {adj} and {adj}. Our chef {char:chef} can't deal with it."`)
		.path(`Ah.`, 5)
		.end();
	
	story.define('nomad5', `A large, {adj} man steps out from behind the others. He is very tall and appears to be the leader. "Hello. My name is {char:nomad}, and I am the chieftan of our tribe. Why were you calling for help?"`)
		.path(`I honestly can't remember.`, 'nomadLeave')
		.path(`Can you point me to the nearest village?`, 6)
		.end();
	
	story.define('nomad6', `"Sure. However, there's only one village within walking distance, and that's {town:main}." The leader points eastward. "Be warned, though; they're known for {evilAct:main}"`)
		.path(`Alright, thanks.`, 'nomadLeave')
		.path(`Why did they call it {town:main}?`, 7)
		.end();
	
	story.define('nomad7', `The nomad glowers at you. "Ask too many questions and we'll eat you alive."`)
		.path(`It's getting late...you should probably be home soon. Oh wait....`, 'nomadLeave')
		.path(`Cry`, 'cry')
		.end();
	
	story.define('nomadLeave', `The nomads walk away.`)
		.path(`Drag yourself to the nearest city`, 'settlement')
		.path(`Call for more help`, 'help')
		.path(`Cry`, 'cry')
		.end();
	
	story.define('paparazzi', `It's a group of paparazzi! You're screwed.`)
		.path(`Pick up your broken body and run`, 'run')
		.path(`Try and negotiate`, 2)
		.path(`Die before they reach you`, 'die')
		.end();
	
	story.define('paparazzi2', `The paparazzi swarm around you, squealing and grunting in a truly {adj} manner.`)
		.path(`Away, fiends!`, 3)
		.end();
	
	story.define('paparazzi3', `You feel your arms and legs detach as you are torn apart by the scrambling horde.`)
		.path(`Call upon {char:hero}`, ['summonHero', 'nothing'])
		.path(`Succumb to your fate`, 'die')
		.end();
	
	story.define('catJesus', `A multitude of voices merge into one as Cat-Jesus appears over the horizon. He gazes down upon your pathetic form and hums deeply. "It seems we meet again, {char:main}."`)
		.path(`You exist!`, 2)
		.path(`What do you mean by 'again'?`, 3)
		.path(`You again? But I'm...you...`, 'catJesusAlready', {'char:main': 'Cat-Jesus'})
		.end();
	
	story.define('catJesus2', `"Yes. Duh."`)
		.path(`Fine. But why are you here?`, 3)
		.path(`But...`, 'catJesusAlready', {'char:main': 'Cat-Jesus'})
		.end();
	
	story.define('catJesus3', `Cat-Jesus gazes at you, scorching your skin and giving you a really {adj} sunburn. "You have defied me for the last time, {char:main}. Allow this curse be a lesson to you."`)
		.path(`Wait, curse...?`, 4)
		.path(`But I'm already Cat-Jesus...`, 'catJesusAlready', {'char:main': 'Cat-Jesus'})
		.end();
	
	story.define('catJesus4', `"Yes, {char:main}. A curse. And a quite {adj} one at that. From this point onward, you will be the new Cat-Jesus. I will be free from this burden!"`)
		.path(`Oh please no.`, 5)
		.path(`But I'm already Cat-Jesus...`, 'catJesusAlready', {'char:main': 'Cat-Jesus'})
		.end();
	
	story.define('catJesus5', `"Oh yes. Ohhh, yes. Goodbye, {char:main}."`)
		.set('char:main', 'Cat-Jesus')
		.set('steed:main', 'cat angel')
		.set('weapon:main', 'tiger claws')
		.path(`Run for your life`, 'run')
		.end();
	
	story.define('catJesusAlready', `"Oh yeah. Whoops. Get out of here, {char:main}."`)
		.path(`Scurry`, 'run')
		.end();
	
	story.define('summonHero', `{char:hero} appears out of nowhere, bathing you in crepuscular rays of {adj} glory.`)
		.context()
		.path(`What took you so long?`, 2)
		.path(`Get me out of here, quick!`, 4)
		.end();
	
	story.define('summonHero2', `{char:hero} stares into your soul. "Dude, I'm not your servant. I know the plot demands that you get all the attention, but we both know I'm the real hero here."`)
		.path(`Murder {char:hero}`, 'murderHero')
		.path(`Can I just play as you instead?`, 'playAsHero')
		.path(`True, true.`, 3)
		.end();
	
	story.define('summonHero3', `"Why did you even summon me here?"`)
		.path(`It's complicated.`, 4)
		.path(`It gave the option, so I wanted to try it.`, 4)
		.end();
	
	story.define('summonHero4', `"Okay. Well, I can take you to the nearest town, if that's any help to you."`)
		.path(`Yes please.`, 'settlement')
		.path(`Nevermind, I'll go back to whatever I was doing.`, null)
		.end();
	
	story.define('murderHero', `You promptly stab {char:hero} with your {weapon:main}.`)
		.path(`What have I done?`, 'identityCrisis')
		.path(`Walk away`, 'road')
		.end();
	
	story.define('playAsHero', `~ You are now playing as {char:main} ~`)
		.set('char:sidekick', '{char:main}')
		.set('weapon:sidekick', '{weapon:main}')
		.set('char:main', '{char:hero}')
		.set('weapon:main', '{weapon}')
		.set('char:hero', '{char}')
		.set('weapon:hero', '{weapon}')
		.path(`Feels good.`, 'start')
		.end();
	
	story.define('run', `You run as fast as you can.`)
		.path(`Run faster`, 2)
		.path(`Maintain your speed`, 3)
		.end();
	
	story.define('run2', `You trip and fall, breaking half the bones in your body.`)
		.path(`Call for help`, 'help')
		.path(`Get up and keep running`, 'run')
		.end();
	
	story.define('run3', `You're starting to get tired.`)
		.path(`Just keep going`, 4)
		.path(`Take a breather`, 4)
		.end();
	
	story.define('run4', `Okay. Now what?`)
		.path(`Run some more!`, 5)
		.path(`Cry`, 'cry')
		.end();
	
	story.define('run5', `You're getting really, really tired.`)
		.path(`Walk instead`, 'road')
		.path(`I'd rather just die`, 'die')
		.end();
	
	story.define('birdLeave', `The bird flies away.`)
		.path(`Chase after the bird`, 2)
		.path(`Oh well. Not that it matters.`, 'identityCrisis')
		.end();
	
	story.define('birdLeave2', `You lose sight of the bird.`)
		.path(`Wow, if only I had something fast like a {steed:main}.`, 3)
		.end();
	
	story.define('birdLeave3', `You climb tentatively onto the back of {char:steed}.`)
		.path(`Wait, who names their {steed:main} {char:steed}?`, 'steed3')
		.end();
	
	story.define('bird', `~ The bird seems to be carrying a note ~`)
		.path(`Call to the bird`, 'callBird')
		.path(`Shoot down the bird`, 'shootBird')
		.path(`Do nothing`, 'birdLeave')
		.end();
	
	story.define('callBird', `The bird doesn't respond, because it's a bird.`)
		.path(`Call to the the bird again`, 'callBird2')
		.path(`Shoot down the bird`, 'shootBird')
		.end();
		
	story.define('callBird2', `"What do you want?" it replies, with an angry look.`)
		.path(`I'd like to read that note, please.`, 'birdGiveNote')
		.path(`Give me that note or else I'll destroy you and everything you love.`, 'birdAttack')
		.end();
	
	story.define('birdGiveNote', `"Since you asked so politely, you may read it," the bird declared in a {adj:birdVoice} voice.`)
		.path(`Why is your voice so {adj:birdVoice}?`, 'angryBird')
		.path(`Read the note`, 'readNote')
		.end();
		
	story.define('angryBird', `"Hey! My voice is not {adj:birdVoice}! You're the one who is {adj:main}!"`)
		.path(`I'm not {adj:main}! Let me see that note!`, 'readNote')
		.path(`Yeah, you're right. Can I see that note?`, 'readNote')
		.end();
		
	story.define('birdAttack', `~ The bird stabs your eyes out and flaps off with your spleen ~`)
		.path(`Well, shucks.`, 'die')
		.end();
	
	story.define('shootBird', `~ The bird plummets to the ground ~`)
		.path(`I'm a terrible person.`, 'birdNote')
		.end();
	
	story.define('birdNote', `You inspect the note. It seems to be addressed from {loc:mission}.`)
		.path(`Read the note`, 'readNote')
		.end();
	
	story.define('readNote', `
			<div class='card text-left px-2 py-5'>
				To whomstsoever reads this note:<br>
				<br>
				{char:nemesis} is {evilAct:main}! We need the help of someone like {char:main} to save us from this most {adj} threat!<br>
				<br>
				Signed,<br>
				{char:lover}
			</div>
		`)
		.path(`Look up into the sun like a true hero`, 'heroPose')
		.path(`Cry`, 'cry')
		.end();
	
	story.define('heroPose', `As you look up into the sun, you hear your retinas sizzling. You feel pretty awesome though.`)
		.path(`Look away before your eyes shrivel up`, 'lookAway')
		.path(`Keep staring like an idiot`, 'killEyes')
		.end();
	
	story.define('cry', `You cry.`)
		.context()
		.path(`Cry more`, 2)
		.path(`Continue`, null)
		.end();
	
	story.define('cry2', `You cry like a little baby.`)
		.path(`Cry more`, 3)
		.path(`Continue`, null)
		.end();
	
	story.define('cry3', `You try to cry, but you have run out of tears.`)
		.path(`Continue`, null)
		.end();
	
	story.define('killEyes', `Your eyes have burst into flames and now you can't see.`)
		.path(`Cry`, 'cry')
		.path(`Die`, 'die')
		.end();
	
	story.define('lookAway', `You look away, and focus on the task at hand: Stopping {char:nemesis} from {evilAct:main}.`)
		.path(`Go to the nearest settlement`, 'settlement')
		.end();
	
	story.define('road', `Feeling {adj}, you walk along the {adj:road} road.`)
		.path(`Keep walking`, [2, 'signpost', 'signpost', 'traveler', 'fortuneTeller', 'roadsideFood'])
		.end();
	
	story.define('road2', `The {adj:road} road just keeps on going.`)
		.path(`Keep walking`, 'road')
		.path(`Run instead`, 'run')
		.end();
	
	story.define('roadsideFood', `You find some {food:roadside} by the side of the road.`)
		.set('food:roadside', '{food}')
		.context()
		.path(`Yum!`, 'foodPoisoning')
		.path(`Pass on that.`, null)
		.end();
	
	story.define('foodPoisoning', `Your intestines let out a squeal of terror as you digest the {food:roadside}. You're going to have to take a break from the journey.`)
		.path(`Die quickly`, 'die')
		.path(`Writhe in pain for the next 3-4 hours`, 'sleep')
		.end();
	
	story.define('sleep', `You drift into restless sleep.`)
		.path(`Finally!`, 'wakeUp')
		.end();
	
	story.define('wakeUp', `Good morning, {loc:main}!`)
		.path(`Stretch and yawn`, null)
		.end();
	
	story.define('traveler', `You happen across another traveler.`)
		.path(`He seems a bit too {adj}.`, 2)
		.path(`How's it going?`, 3)
		.path(`Walk away`, 'road')
		.end();
	
	story.define('traveler2', `The traveler stops and waves as you walk nearer. He seems relatively harmless, but you can't be too sure in these parts of {loc:main}.`)
		.path(`Hello, sir. What's your business around here?`, 3)
		.end();
	
	story.define('traveler3', `"Good day! I'm {char:nemesis} from the {adj} town of {town}."`)
		.path(`Hold up.`, 4)
		.end();
	
	story.define('traveler4', `You realize this traveler's name is identical to that of your nemesis, {char:nemesis}. Could this be a coincidence, or is an epic battle about to take place?`)
		.path(`It's a coincidence. He looks completely different.`, 5)
		.path(`It's not a coincidence! Attack!`, 6)
		.end();
	
	story.define('traveler5', `The traveler waves amicably. "I'd better be on my way. See you around!"`)
		.path(`Continue walking`, 'road')
		.path(`He knows I'm onto him. Attack!`, 6)
		.end();
	
	story.define('traveler6', `You brandish your {weapon:main} and shout curses at the traveler. His eyes grow wide with shock and he falls over. Gingerly picking himself up, he wails, "Don't hurt me! I don't know what you're talking about!"`)
		.path(`Oh my, I'm so sorry. I thought you were someone else.`, 'road')
		.path(`Stab him with your {weapon:main}`, 7)
		.end();
	
	story.define('traveler7', `"Sir, please let me live! I mean no harm!"`)
		.path(`Farewell, then. We shall now part ways.`, 'road')
		.path(`Stab him with your {weapon:main}`, 8)
		.path(`Summon {char:hero} to do your dirty work`, 'summonHero')
		.end();
	
	story.define('traveler8', `The traveler dies with an agonizing, {adj} shriek.`)
		.path(`Now I just feel bad.`, 'road')
		.end();
	
	story.define('signpost', `You encounter a slightly {adj} crossroads. A nearby signpost seems to point toward a small settlement.`)
		.set('town:main', '{town}')
		.set('motto:main', '{motto}')
		.path(`Visit the settlement`, 'settlement')
		.path(`Keep walking`, 'road')
		.end();
	
	story.define('fortuneTeller', `A small tent appears over the hill in front of you. You wonder if someone is inside.`)
		.path(`Take a look`, 2)
		.path(`I've been through enough today.`, 'road')
		.end();
	
	story.define('fortuneTeller2', `Soft, {adj} music reaches your ears as you walk over to the tent.`)
		.path(`Music is good.`, 3)
		.path(`I'm unquestionably being set up here.`, 'road')
		.end();
	
	story.define('fortuneTeller3', `You open the tent flap and drop into what appears to be the home of a stereotypical fortune-teller lady.`)
		.path(`I should stay and wait for her to come back.`, 4)
		.path(`Nooope.`, 'road')
		.end();
	
	story.define('fortuneTeller4', `After a few hours, you realize she probably isn't coming back.`)
		.path(`Okay, now I'm getting nervous.`, 'federation')
		.end();
	
	story.define('federation', `You take a peek outside. To your surprise, you're surrounded by alien {steed:alien} people from the Intergalactic Federation. One of them is carring a really {adj} {weapon:alien}, and judging by the expression on his face, it's got your name on it.`)
		.path(`Fight!`, 3)
		.path(`Run!`, 2)
		.path(`Negotiate?`, 4)
		.end();
	
	story.define('federation2', `You're surrounded. You can't just run.`)
		.path(`Fight!`, 3)
		.path(`Call upon the might of {char:hero}!`, 'summonHero')
		.path(`Cry`, 'cry')
		.end();
	
	story.define('federation3', `You size up the {steed:alien}, and on second thought you probably wouldn't stand a chance.`)
		.path(`Bring it on!`, 5)
		.path(`Let's hear what they have to say first.`, 4)
		.path(`Cry`, 'cry')
		.end();
	
	story.define('federation4', `The head {steed:alien} steps forward. "We come to inform you of your violations against the Intergalactic Federation in your undocumented pursuit of {char:nemesis} and his propensity for {evilAct:main}. Under the code of law you are considered a vigilante, and swift action must be taken to..."`)
		.path(`Eat my {weapon:main}!`, 5)
		.path(`Cry`, 'cry')
		.end();
	
	story.define('federation5', `The {steed:alien} raises his {weapon:alien} and slams it down onto you, causing unthinkable damage to your entire body.`)
		.path(`It's not over yet...`, 6)
		.path(`Die`, 'die')
		.end();
	
	story.define('federation6', `In the blink of an eye, the {steed:alien} people disappear.`)
		.path(`Call for help`, 'help')
		.path(`Concede to the inevitable`, 'die')
		.end();
		
	story.define('settlement', `
		As you approach the settlement, a sign comes into view:
		<div class='card p-2 m-5'>
			<h4>{town:main}</h4>
			<p>{motto:main}</p>
		</div>
		`)
		.path(`Enter {town:main}`, ['enterSettlement', 'enterSettlementLady'])
		.path(`This place seems weird; find another settlement`, 'road')
		.path(`Let's burn it down, {char:sidekick}!`, 'settlementAttack', 'char:sidekick')
		.end();
		
	story.define('enterSettlement', `You walk through {town:main}, taking in the {adj:town} sights.`)
		.path(`Continue walking`, "settlement1")
		.path(`Leave {town:main}`, "settlement")
		.end();
		
	story.define('settlementHanging', `You reach the town square, where many townsfolk are gathered. You avoid eye contact as you make your way through the crowd.
		At the center of the mass of people sits an old man proclaiming the good works of Cat-Jesus. However, that's not why everyone is gathered.
		There is a hanging happening today!`)
		.path(`Talk to the townsperson`, "askTownsperson")
		.path(`Watch the hanging`, "watchHanging")
		.path(`Push your way into the crowd and find the Cat-Jesus guy`, 'catCult', {'char:main': 'Cat-Jesus'})
		.end();
		
	story.define('watchHanging', `You watch as the convict is carted into the square as the crowd admires the {adj:dislike} gallows. You feel morally conflicted, since from a young age you've always disliked {adj:dislike} things.`)
		.path(`Sneak over to the convict`, 'hangingHero')
		.path(`I don't dislike {adj:diskile} things THAT much...`, 'settlementHanging')
		.end();
		
	story.define('hangingHero', `You stand face to face with the convict.`)
		.path(`Tell him you'll help him but he must help you afterwards`, 'riotStart')
		.path(`Tell him you'll help him for nothing in return`, 'riotStart')
		.path(`Recite the Cat-Jesus prayer for forgiveness in his honor`, 'prayer')
		.end();
		
	story.define('prayer', `O our lord of all lords the one Cat-Jesus, please take mercy; for we are all but scrawny mites in the presence of your Whiskers and Paws.`)
		.context()
		.path(`Continue`, 2)
		.end();
		
	story.define('prayer2', `We ask not for your aid, nor for your blessing; but rather, for your forgiveness of our sins; Let us live, so we may better serve the Way as the Way shall be served.`)
		.path(`Amen`, null)
		.path(`Yeah I pray to myself all the time.`, null, {'char:main': 'Cat-Jesus'})
		.end();
	
	story.define('riotStart', `You've won the man's trust, but now you must act quick!`)
		.path(`You rip your body in two, scream and reveal yourself as Cat-Jesus.`, 'catCult2', {'char:main': 'Cat-Jesus'})
		.path(`Protest the law of touching the road and yell offensive jibberish`, 'riot')
		.path(`Start dancing so fast that your feet become balls of fire`, 'riot')
		.end();
	
	story.define('riot', `The crowd is bewildered and appalled. Some look like they want to kill you and others seem to support you.`)
		.path(`Let them kill you, right after you take the noose off the convict`, 'deathTwist')
		.path(`Recall the rhetorical triangle to win over the entire town`, 'mayor')
		.end();
		
	story.define('deathTwist', `The crowd approaches you with stones with the intent to kill, but that moment, the ground cracks and you are lifted away from the town.`)	
		.path(`Revel in your incredible luck`, 'moonPeople')
		.path(`Jump off your patch of ground and plummit into the town`, 'die')
		.end();
	
	story.define('mayor', `You are suddenly elected as the mayor of the town for your 'outstanding' and '{adj}' speaking abilities.`)
		.path(`That was quick.`, 2)
		.end();
	
	story.define('mayor2', `As the new mayor, it seems the local aristocracy is anxious to welcome you.`)
		.path(`Tea party`, 'teaParty')
		.end();
	
	story.define('teaParty', `You sit down at a table full of wig-laden noblemen. One by one, they introduce themselves while a servant passes out {food:tea}-flavored tea. All eyes turn to you. "Mayor, it's an _honor_. Please help us get to _know_ you."`)
		.path(`I'm a zany ranger from the {loc:home} badlands and I'm here to stop {char:nemesis} from {evilAct:main}.`, 2)
		.path(`I'm far wealthier than all of you fools.`, 2)
		.path(`I'm the main character from _{title:main}_.`, 2)
		.end();
	
	story.define('teaParty2', `A prominently bearded landlord stands up. "{int} Please, _do_ tell us more. Just for your _consideration_, I order pizza worth more than the likes of you, so remain _modest_."`)
		.path(`You call yourself well off? My underwear is made of silk interlaced with gold. They probably cost more than your wife did.`, 3)
		.path(`What are those shoes you're wearing? Elf slippers?`, 'nobilityShame')
		.path(`Nice beard. I bet you have it because you can't afford a razor.`, 'nobilityShame')
		.end();
	
	story.define('teaParty3', `~ The man sits down ~`)
		.path(`Next.`, 4)
		.path(`Gentlemen, what even is this _{food:tea}_ tea, anyway? Who even makes this stuff?`, 'nobilityShame')
		.end();
	
	story.define('teaParty4', `A fabulously colorful duke stands to interject. His {color} robes whip through the antiquated chamber as he stomps toward you. "My backyard garden was more expensive than your mother's prison bail!"`)
		.path(`My family has been in power for 10,000 years. Your family probably didn't even have a name until you were born, and your lack of propriety immediately disgraced it.`, 5)
		.path(`Want to fight, buddy?`, 'nobilityShame')
		.path(`Touché, my friend.`, 'nobilityShame')
		.end();
	
	story.define('teaParty5', `Shouts of physical and psycological pain reverberate through the chamber as everyone starts shouting at the top of their lungs. You hear one man yelling, "Your grandfather was a _petty_ sandwich handler, just like {char:nemesis}!"`)
		.path(`Wait a minute. {char:nemesis}?`, 6)
		.end();
	
	story.define('teaParty6', `"Yes, and if he's your friend we're never talking to him again."`)
		.path(`No, he's actually my eneme...nevermind. How do you know him?`, 7)
		.end();
	
	story.define('teaParty7', `The noblemen settle down again, brushing themselves off and retrieving fallen wigs from under tables. "Of _course_ we know him. How _else_ do you think we made all this money? There's good business to be made when you're {evilAct:main}."`)
		.path(`You've all been {evilAct:main}?`, 8)
		.end();
	
	story.define('teaParty8', `"Yes it's quite profitable these days. Especially in {loc:nemesis}"`)
		.path(`Where is {char:nemesis}? I have a score to settle.`, 8)
		.path(`Get me in on this business.`, 8)
		.end();
	
	story.define('teaParty9', `"Sir, you might _ponder_ the arrangement of a meeting with {char:nemesis} in {loc:nemesis}. He tends to move from place to place, but his headquarters may be found on the outskirts of {town:nemesis}"`)
		.path(`Where is {char:nemesis}? I have a score to settle.`, 8)
		.path(`Get me in on this.`, 8)
		.end();
	
	story.define('nobilityShame', `~ The nobility laughs at your stupidity ~`)
		.context()
		.path(`Suck it up`, null)
		.path(`Weep`, 'cry')
		.path(`Die of shame`, 'die')
		.end();
	
	story.define('catCult', `Squeezing between two {adj} ladies and a quite {adj} grump, you step forward and announce your presence to the old man.`)
		.path(`Say nothing`, 2)
		.path(`I'm Cat-Jesus!`, 2)
		.end();
		
	story.define('catCult2', `The man stares intently at your furry pelt and {adj} whiskers. "It can't be."`)
		.path(`Yeah it can.`, 3)
		.path(`Bow before me, for I spare only those who pay homage to My great form.`, 2)
		.end();
		
	story.define('catCult3', `He wails and prostrates himself in submission to your divine presence.`)
		.path(`This whole 'being a god' thing ain't too bad afer all.`, 4)
		.end();
		
	story.define('catCult4', `A mischevious teenager smirks from the sidelines. "He only pretended to believe in you so people would give him money."`)
		.path(`Heresy! Become smitten!`, 5)
		.path(`Eh, I'll spare you if you help me out.`, 5)
		.end();
		
	story.define('catCult5', `A bold of lightning strikes the gallows, spraying the crowd with wood chips. The old man looks up, contemplates for a second, and jumps to his feet. "Forget my old life, I'm rolling with Cat-Jesus now!"`)
		.path(`Eh, what's a god without his devotee.`, 7)
		.path(`Not so fast, unbeliever.`, 6)
		.end();
		
	story.define('catCult6', `You explain to the old man that {char:nemesis} is {evilAct:main}, and must be stopped. He looks on, nodding vaguely as though distracted by your {adj} godliness.`)
		.set('char:sidekick', 'Cat-Cult Elder')
		.path(`Enough talk -- let's move, {char:sidekick}.`, 'road')
		.path(`You can be my sidekick...IN THE AFTERLIFE!`, 7)
		.end();
		
	story.define('catCult7', `The man disappears in a spark of bright embers, and you're left surrounded by a crowd of apprehensive onlookers. They start muttering to one another saying things like, "Cat-Jesus is all talk, no stock. Let's take him down! He can't win if we bog him down with our {adj} mass of humanity."`)
		.path(`Agree`, 'run')
		.path(`Disagree`, 'die')
		.end();
		
	story.define('askTownsperson', `You turn to your right and see a {adj:townsperson} townsperson. They give you a wild-eyed stare.`)
		.path(`Ask about the hanging`, 2)
		.path(`Turn back to the hanging and try to ignore them`, "watchHanging")
		.end();
	
	story.define('askTownsperson2', `You open your mouth to speak, but the townsperson is quicker. "Good day! My name is {char:townsperson}! I have `+(Math.floor(Math.random() * 13) + 1)+` children and no life!" They continue their wild-eyed stare.`)
		.path(`Yes, um... Why is there a hanging today?`, 3)
		.path(`{char:townsperson}, I need your help. Someone is going around {evilAct:main}, and we need to do something about it!`, 'excursion')
		.end();
		
	story.define('askTownsperson3', `"There is a man who touched the road! NO ONE CAN TOUCH THE ROAD!"`)
		.path(`That's illegal here?`, 4)
		.end();
		
	story.define('askTownsperson4', `You back up slowly and make your way through the crowd. You want to leave this place. As you walk back through the settlement,
		now desolate because of the hanging, you spot a pillar of smoke over the horizon.`)
		.path(`Go to the smoke`, "spaceship")
		.path(`Find another settlement`, "settlement")
		.end();
		
	story.define('spaceship', `As you approach the source of the smoke, you become horrified. Partially buried in the ground
		in front of you lies a spaceship. The cockpit blinks and chirps, but there is no life source to be found.`)
		.path(`Examine closer`, 2)
		.path(`Go back into town`, 'settlement')
		.end();
		
	story.define('spaceship2', `You step closer and look inside the cockpit. You see a folded piece of paper and a {weapon:spaceship}.`)
		.path(`Read note`, 3)
		.path(`Pick up {weapon:spaceship}`, 'getSpaceshipWeapon')
		.end();
		
	story.define('getSpaceshipWeapon', `You picked up the {weapon:spaceship}.`)
		.set('weapon:main', '{weapon:spaceship}')
		.path('Read the note', 'spaceship3')
		.end();
		
	story.define('spaceship3', ` You see this scrawled on the paper:
		<div class='card text-left px-2 py-5'>
			{char:main}, you are our only hope. <br> Please use this spaceship and meet us at this Intergalactic Coordinate Point: <br>
			23532.1355.134 15555.1746.9516 <br> <br>
			P.S. We can help you find {char:nemesis}.
		`)
		.path(`Take the spaceship`, 4)
		.path(`Return to town and pretend this never happened`, 'enterSettlement')
		.end();
		
	story.define('spaceship4', `You climb into the cockpit and realize you don't have the slightest clue what you're doing.`)
		.path(`Activate the hypothermal thrust contractors`, 'hissing')
		.path(`Increment the pseudo-cyclical strut duct`, 'pow')
		.path(`Fire the rotational axis power reducer`, 5)
		.path(`Activate the photovoltaic darkening system`, 'darken')
		.end();
		
	story.define('hissing', `You hear a hissing sound.`)
		.context()
		.path(`That doesn't seem right.`, null)
		.end();
		
	story.define('splash', `You hear a splash.`)
		.context()
		.path(`That doesn't seem right.`, null)
		.end();
		
	story.define('pow', `As soon as you touch the controls, you hear a loud "POW!"`)
		.context()
		.path(`That doesn't seem right.`, null)
		.end();
		
	story.define('spaceship5', `You hear a quiet whirring sound. Sounds correct to you.`)
		.path(`Upend the horizontal alignment gearing overvolter`, ['pow', 'hissing'])
		.path(`Realign the Jupiter Guidance System`, 6)
		.path(`Concentrate the washer fluid`, ['pow', 'splash'])
		.path(`Charge the flux capacitor`, ['pow'])
		.end();
		
	story.define('spaceship6', `The Jupiter Guidance System comes to life. You enter the Intergalactic coordinates.`)
		.path(`Connect the CAT17 cable to the locomotive transitional hyperspace drive`, 7)
		.path(`Defragment the crash rotator`, ['pow', 'hissing'])
		.path(`Cancel the omnipotent gravity stretcher`, ['pow', 'hissing'])
		.path(`Fumble with the prograde directional indicator`, 'hissing')
		.end();
		
	story.define('spaceship7', `The CAT17 cable seems to connect the guidance system to the LTHD. You might have to remove it later.`)
		.path(`Turn the dial labeled "415-DFNR"`, 8)
		.path(`Hit the four dimensional horizontal display system`, 'pow')
		.path(`Translate the object-oriented star RAM`, ['pow', 'hissing'])
		.path(`Kill the gyroscopic orientation meter`, 'splash')
		.end();
		
	story.define('spaceship8', `You turn the dial and it doesn't seem to do anything. Better than making some terrible noise though.
		It occurs to you that the label "DFNR" might stand for "Dial For No Reason."`)
		.path(`Reduce the waste creation systems`, ['pow', 'hissing'])
		.path(`Tap the "Delete Random Planet" button`, 'pow')
		.path(`Run the pre-flight simulation`, 9)
		.path(`Hang the zero-division float computer`, ['pow', 'hissing'])
		.end();
		
	story.define('spaceship9', `As the pre-flight simulation runs, you twiddle your thumbs and wait for it to complete. After a couple of minutes, the hyperspace drive roars to life!`)
		.path(`Pull back on the joystick`, 10)
		.path(`Move up the throttle`, 10)
		.path(`Adjust the flaps for takeoff`, 'hissing')
		.path(`Fire the anti-personnel cockpit lasers`, 'laseredToDeath')
		.end();
		
	story.define('spaceship10', `We have liftoff! Somehow you managed to get the spaceship running. What do you want to do now?`)
		.path(`Go to space, obviously.`, 11)
		.end();
		
	story.define('spaceship11', `You activate the Jupiter Guidance System and the spaceship points towards the Intergalactic Coordinate Point. The cockpit display says _hyperspace driving charging_. 
		After a few moments, the spaceship suddenly accelerates rapidly.`)
		.path('I may have peed myself a bit.', 12)
		.end();
		
	story.define('spaceship12', `You sit back and relax after a few moments of pure terror. The humming of the hyperspace drive is hypnotizing.`)
		.path('I might take a little nap...', 13)
		.end();
		
	story.define('spaceship13', `You fall asleep quickly. You're enjoying your little nap until you're rudely awoken by red lights flashing, alarms blaring, and a voice repeating "Emergency hyperspace drop imminent." You sit up quickly and see a small, circular spaceship with a beam going to your ship.`)
		.path('I accept my fate.', 15)
		.path('Try to escape!', 'escapeShip')
		.end();
		
	story.define('escapeShip', `You try to increase your throttle, but it's no use - not only is the tractor beam very strong, your piloting skills are lacking.`)
		.path('Okay, now I accept my fate.', 'spaceship15')
		.end();
		
	story.define('spaceship15', `As your ship slows to a stop, the other ship comes near and docks onto your ship. Two figures climb out of the ship and enter yours.`)
		.path('Go to meet them', 16)
		.path('Try to hide', 'hide')
		.path('Fight them!', 'rickKills')
		.end();
		
	story.define('hide', `You try to find somewhere to hide, but this is a small spaceship.`)
		.path('Hide in the cargo bay', 2)
		.path('Hide behind the seat', 3)
		.path('Go and meet them', 'spaceship16')
		.end();
		
	story.define('hide2', `The cargo bay is the largest spot on this ship, maybe you can hide there. You run to the cargo bay and cower in fear.`)
		.path('Continue hiding', 4)
		.end();
		
	story.define('hide3', `You try to hide behind the seat, but it's fairly small. You get the feeling you look really dumb.`)
		.path('Continue hiding', 5)
		.path('Give up and meet them', 'spaceship16')
		.end();
		
	story.define('hide4', `You stay as still and quiet and possible. Suddenly, there's a loud *ZAP* and the cargo door flies open.
		A fairly old man with blue spiky hair and something leaking out of his mouth - you're not sure if it's spit or vomit - stands in front of you.
		"You think you can hide in the cargo bay? Everyone hides in the cargo bay, you idiot! It's the first place you look! What are you, 5? Have you never been to space before,
		you tiny stupid animal?! And speaking of stupid, do you think I'm stupid? Why would a spaceship be flying around WITHOUT SOMEONE IN IT??" You are terrified. You notice a short boy wearing an orange shirt standing behind him.`)
		.path("Why are you here?", 'spaceship17')
		.end();
		
	story.define("hide5", `You stay as still and quiet and possible. Suddenly, a fairly old man with blue spiky hair and something leaking out of his mouth - you're not sure if it's spit or vomit - 
		walks up behind you and shouts, "HEY!! What are you, retarded? You think you can hide behind a freaking chair?? What is WRONG with you? Do you think you're some sort of midget or something??
		Well I have news for you, buddy! You're not! So get up and look at me LIKE A MAN!" You are terrified. You notice a short boy wearing an orange shirt standing behind him.`)
		.path("Why are you here?", 'spaceship17')
		.end();
		
	story.define("spaceship16", `You walk up to the point where they docked with the ship, and wait for them to show up. Eventually a fairly old man with blue spiky hair and something leaking out of his mouth - you're not sure if it's spit or vomit - and a short boy with an orange shirt
		walk up to you. The man looks angry and the boy seems scared. You're not sure if he's scared or you or the blue-haired man.`)
		.path("Why did you stop my ship?", "spaceship17")
		.end();
		
	story.define("spaceship17", `"This isn't your ship, is it?" The man says, oddly calm. You shake your head no. "I know it's not your ship, because *Burrrrp* it's MINE!" he shouts.`)
		.path("I found this ship and it had a note addressed to me in it.", "spaceship18")
		.end();
		
	story.define("spaceship18", `He gives you a confused look. "Let me see it," he says.`)
		.path("Okay, here you go.", "spaceship19")
		.path("No! You'll never take me alive!", "rickKills")
		.end();
		
	story.define("spaceship19", `He reads the note. "We need to get you out of here! This letter is a trap from the Intergalactic Federation!" The boy looked apprehensive. "Aw jeez Grandpa, this isn't really our problem, do we really want to get involved in this?"`)
		.path("Wait, why is the Intergalactic Federation after me?", "spaceship20")
		.end();
	
	story.define("spaceship20", `"The Intergalactic Federation goes after anyone that threatens their rule. If they're going after you, you must be an okay guy." The blue-haired man sits in the pilot seat. The boy jumps in on the left side, and you squeeze in the middle. "We need to get you to a planet outside of Intergalactic Federation jurisdiction," said the blue-haired man.`)
		.path("What are your names?", 21)
		.path("Why are you helping me?", 22)
		.end();
		
		
	story.define('rickKills', `You try to attack them with your {weapon:main}, but it's no use. The blue-haired man pulls out a laser gun and shoots you much faster than you could have imagined. Your brain is vaporized on the spot.`)
		.path("Ah well.", 'die')
		.end();
		
	story.define('laseredToDeath', `The instant you press the button, lasers fire from the ceiling and vaporize you. Why is that even a button?`)
		.path(`I guess I should have known based on the name...`, 'die')
	
	story.define('darken', `When you activate the system, the windshield darkens.`)
		.path(`I should have known.`, 'spaceship4')
		.end();
		
	story.define('excursion', `The townsperson stares at you in {adj} horror. "How could they? We must act!"`)
		.path(`Yes, {char:townsperson}. Follow me!`, 2)
		.end();
		
	story.define('excursion2', `"Lead the way, {char:main}."`)
		.path(`Alrighty, let's move; we need to to hit the road.`, 3)
		.end();
		
	story.define('excursion3', `"Wait, no! Don't touch the road!"`)
		.path(`Touch the road`, 'askTownsperson3')
		.path(`Oh. Okay.`, 4)
		.end();
		
	story.define('excursion4', `"I'll tell you what. If you don't drag me into this, I won't let anyone know you were planning to touch the road. But you'd better scurry as fast as your {adj} legs can carry you. Got it?"`)
		.path(`Touch the road`, 'askTownsperson3')
		.path(`Well in that case, I'm out of here.`, 'road')
		.path(`If I can't touch the road, could we just ride a {steed:main}?`, 5)
		.end();
		
	story.define('excursion5', `"Yes, that's perfectly fine and legal. I'll follow your lead."`)
		.set('char:sidekick', '{char:townsperson}')
		.path(`Go figure. Now let's ride!`, 'excursionRide')
		.path(`How about we at least pack some food first.`, 'packFood', '!food:main')
		.end();
		
	story.define('excursionRide', `You each jump on your respective {steed:main} and follow the road west of {town:main}.`)
		.path(`Keep riding`, 2)
		.end();
		
	story.define('excursionRide2', `After a while, you start to get hungry.`)
		.path(`Eat the {food:main}`, 3, 'food:main')
		.path(`Scrounge for food`, 'roadsideFood')
		.path(`Call for help while you slowly starve`, 'help')
		.end();
		
	story.define('excursionRide3', `After that nourishing albeit {adj} meal, you and {char:sidekick} prepare to remount and continue on your expedition.`)
		.set('food:main', null)
		.path(`Consult your {adj:map} map`, 4)
		.end();
		
	story.define('excursionRide4', `It seems as though you were traveling in the opposite direction this whole time. {char:sidekick} leans over and asks, "{char:main}, but where are we even going in the first place?"`)
		.path(`Answer evasively`, 5)
		.end();
		
	story.define('excursionRide5', `"Well, {char:sidekick}, I have this feeling we're heading somewhere very important." {char:sidekick} stares you square in the eye. "Huh?"`)
		.path(`Yeah okay let's just head back.`, 6)
		.end();
		
	story.define('excursionRide6', `You finally reach {town:main} once again. {char:sidekick} slides off his horse, exhausted, but then trips and lands face-first on the road. "I've touched the road..." He stares forward in {adj} stock. "Well, now that I'm a criminal, I'd better stick with you, {char:main}. Live the rogue life, you know?"`)
		.path(`Sure thing.`, 'enterSettlement')
		.path(`YOU TOUCHED THE ROAD! DIE!`, 'murderSidekick')
		.end();
		
	story.define('murderSidekick', `You violently stab {char:sidekick} with your {weapon:main}.`)
		.set('char:sidekick', null)
		.path(`I'm a vigilante, b***.`, 'settlement')
		.end();
		
	story.define('packFood', `You find a bit of {food:option1} as well as {food:option2}.`)
		.context()
		.set('food:option1', '{food}')
		.set('food:option2', '{food}')
		.path(`Let's go with the {food:option1}`, 'packOption1')
		.path(`I'd honestly rather take the {food:option2}`, 'packOption2')
		.end();
		
	story.define('packOption1', `You go ahead and pack the {food:option1}.`)
		.set('food:main', '{food:option1}')
		.path(`Can't wait to eat that.`, null)
		.end();
		
	story.define('packOption2', `You go ahead and pack the {food:option2}.`)
		.set('food:main', '{food:option2}')
		.path(`Can't wait to eat that.`, null)
		.end();
		
	story.define('enterSettlementLady', `As you enter the {adj} town of {town:main}, a {adj:lady} lady runs up to you in a panic. "{char:main}!" she exclaims.`)
		.path('Yes, {adj:lady} lady?', 'talkToLady')
		.path('Ignore lady', 'enterSettlement')
		.path(`DON'T MESS WITH CAT-JESUS!`, 'vaporizeLady', {'char:main': 'Cat-Jesus'})
		.end();
		
	story.define('talkToLady', `"My whole life I've been dreaming of meeting you! You're my hero!" As she babbles on about your {adj} hair and {adj} face, you notice hear reaching behind her back slowly.`)
		.path(`Ask her about what she has behind her back`, 'askLady')
		.path(`Allow her to continue groveling and pretend you didn't notice`, 'grovelLady')
		.path(`Why is this town's motto '{motto:main}'`, 'grovelLady')
		.end();
		
	story.define('grovelLady', `The {adj} lady goes on and on...`)
		.path(`Ask her about what she has behind her back`, 'askLady')
		.path(`Die of boredom`, 'die')
		.end();
		
	story.define('askLady', `"What? Nothing," she says, and continues groveling.`)
		.path(`Believe her blatant lie`, 'ladyStab')
		.path(`Ask her again more forcefully`, 2)
		.path(`Punch her lights out like the horrible human you are`, 'killLady')
		.end();
		
	story.define('askLady2', `"Really, I have nothing," as she continues sharpening a knife behind her back.`)
		.path(`Grab the knife`, 'getKnife')
		.path(`Run away`, 'enterSettlement')
		.path(`Sacrifice yourself to the gods of {adj:lady} ladies`, 'die')
		.end();
	
	story.define('getKnife', `You try to grab the knife but she stabs you through the hand before you can get a grip.`)
		.path(`Attempt to remove knife from your hand`, 'removeKnife')
		.path(`Stick your fingers up her nostils to suffocate her`, 'suffocateLady')
		.path(`Sacrifice yourself to the gods of {adj:lady} ladies`, 'die')
		.end();
		
	story.define('removeKnife', `You try to remove the knife, but as you pull your hand away she stabs your other hand in a shish-kabob-esque fashion. "YOU SHALL PAY FOR WHAT YOU HAVE DONE," she proclaims in an oddly deep voice.`)
		.path(`Cry`, 'cry')
		.path(`Sacrifice yourself to the gods of {adj:lady} ladies`, 'die')
		.end();
		
	story.define('suffocateLady', `You stick your fingers as far up her nostrils as they can fit -- looks like around the second knuckle. Impressive.`)
		.path(`Remove hand while she's distracted`, 'removeHand')
		.path(`Sacrifice yourself to the gods of {adj:lady} ladies`, 'die')
		.end();
		
	story.define('vaporizeLady', `A super-concentrated crepuscular ray strikes the {adj:lady} lady, instantly vaporizing her.`)
		.path(`Act like nothing happened`, 'enterSettlement')
		.end();
		
	story.define('removeHand', `You successfully remove your hand from the knife. It's bleeding profusely, but at least there's not a knife in it.`)
		.path(`Try to stick your fingers farther up the {adj:lady} lady's nostrils`, 'killLady')
		.path(`Punch {adj:lady} lady in the face`, 'killLady')
		.path(`Sacrifice yourself to the gods of {adj:lady} ladies`, 'die')
		.end();
		
	story.define('killLady', `Congratulations! That was just forceful enough to render the {adj:lady} lady a nonissue.`)
		.path(`Bandage hand and wander the town`, 'enterSettlement')
		.path(`Call for help`, 'help')
		.end();
		
	story.define('ladyStab', `You were stabbed by the {adj:lady} lady.`)
		.path(`I accept my fate.`, 'die')
		.end();
		
	story.define('settlementAttack', `You heft your {weapon:main} while your sidekick, {char:sidekick}, twirls his {weapon:sidekick}.`)
		.path(`Procure gasoline`, 2)
		.end();
		
	story.define('settlementAttack2', `You walk over to the nearest gas station. A particularly {adj} man leans against the nearest pump, idly refueling his {adj:vehicle} vehicle.`)
		.path(`Can we please borrow your pump?`, 3)
		.path(`Get out of here, and we'll burn your house down!`, 4)
		.end();
		
	story.define('settlementAttack3', `The man yawns and continues to refuel his {adj:vehicle} vehicle.`)
		.path(`Brandish your {weapon:main}`, 4)
		.path(`Let {char:sidekick} threaten him instead`, 4)
		.end();
		
	story.define('settlementAttack4', `~ The man runs away ~`)
		.path(`Let's start by torching that {adj:vehicle} vehicle.`, 5)
		.path(`Burn it all!`, 8)
		.end();
		
	story.define('settlementAttack5', `You start pouring gasoline everywhere as {char:sidekick} readies his flamethrower. "That's right, I found a flamethrower. And it also has a bayonet!"`)
		.path(`Cool. Light 'er up.`, 7)
		.path(`Where? I want one too!`, 6)
		.end();
		
	story.define('settlementAttack6', `"It's the only one. I found it. It's mine." {char:sidekick} hugs the flamethrower.`)
		.path(`Gimme!`, 7)
		.path(`Fine. then you do the honors.`, 8)
		.end();
		
	story.define('settlementAttack7', `~ You wrestle the flamethrower from {char:sidekick} ~`)
		.set('weapon:main', 'flamethrower bayonet')
		.set('char:sidekick', null)
		.path(`Continue burning down the settlement`, 8)
		.path(`Take the flamethrower and run`, 'run')
		.end();
		
	story.define('settlementAttack8', `The {adj:vehicle} vehicle roars into flame as you light the gasoline. Terrified screams emanate from the town square as the entire gas station explodes in a giant fireball of {adj} doom.`)
		.path(`Continue burning down the settlement`, 9)
		.end();
		
	story.define('settlementAttack9', `Shrieking maniacally, you run through town and set buildings ablaze left and right.`)
		.path(`Continue burning down the settlement`, 10)
		.end();
		
	story.define('settlementAttack10', `Finally, as the embers settle and the sky twinkles with the smoke and ash of utter desolation, your ethics get the better of you and you feel like running away before you fully comprehend about what you've done.`)
		.path(`Run away`, 'run')
		.path(`Walk away; you're too cool to run`, 'walk')
		.end();
		
	return story;
})