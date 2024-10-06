import Module from './module.class'

class Modules {
    constructor() {
        this.data = [];
    }

    populate(modulesArray) {
        this.data = modulesArray.map(moduleData => new Module(moduleData.code, moduleData.cliteral, moduleData.vliteral, moduleData.courseId));
    }

    toString() {
        return this.data.map(module => module.toString()).join('\n');
    }

    getModuleByCode(code) {
        const module = this.data.find(module => module.code === code);
        if (!module) {
            throw new Error(`Module with code ${code} not found.`);
        }
        return module;
    }



    
}

export default Modules;
