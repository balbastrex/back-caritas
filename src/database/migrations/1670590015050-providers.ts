import {MigrationInterface, QueryRunner} from "typeorm";

export class providers1670590015050 implements MigrationInterface {
    name = 'providers1670590015050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`provider\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(60) NOT NULL, \`id_economato\` int NOT NULL, \`created\` date NOT NULL, \`updated\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`provider\` ADD CONSTRAINT \`FK_ad9b84081697e78df153910e52a\` FOREIGN KEY (\`id_economato\`) REFERENCES \`economato\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider\` DROP FOREIGN KEY \`FK_ad9b84081697e78df153910e52a\``);
        await queryRunner.query(`DROP TABLE \`provider\``);
    }

}
