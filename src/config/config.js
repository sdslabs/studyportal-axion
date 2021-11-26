const DEVELOPMENT = true;

export const CONFIG = DEVELOPMENT
  ? {
      nexusRoot: 'http://localhost:8005/api/v1',
      arceusRoot: 'http://arceus.sdslabs.local',
      studyRoot: 'http://studyportal.sdslabs.local',
      mediaRoot: 'http://localhost:8005',
      wsRoot: 'ws://localhost:8005',
    }
  : {
      nexusRoot: 'https://nexus.sdslabs.co/api/v1',
      arceusRoot: 'https://accounts.sdslabs.co',
      studyRoot: 'https://study.sdslabs.co',
      mediaRoot: 'https://nexus.sdslabs.co',
      wsRoot: 'ws://nexus.sdslabs.co',
    };
