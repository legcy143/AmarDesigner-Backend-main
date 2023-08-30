import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, ValidationPipe, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDTO } from './dto/projects.dto';
import { ObjectId } from 'mongoose';
import {
  ProjectNotFoundException,
  ProjectCreationException,
  ProjectDeletionException,
} from './exceptions/projects.exception';
import { UpdateProjectDTO } from './dto/UpdateProject.dto';
import { ContactDTO } from './dto/Contact.dto';

@Controller('project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * Create a new project.
   * @param createProjectDto The data for creating a project.
   * @returns The newly created project.
   * @throws {ProjectCreationException} If an error occurs while creating the project.
   */
  @Post()
  async create(@Body(new ValidationPipe()) createProjectDto: ProjectDTO) {
    try {
      return await this.projectsService.create(createProjectDto);
    } catch (error) {
      throw new ProjectCreationException();
    }
  }

  /**
   * Get all projects.
   * @returns An array of projects.
   * @throws {HttpException} If an error occurs while fetching the projects.
   */
  @Get()
  async findAll() {
    try {
      return await this.projectsService.findAll();
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get a project by ID.
   * @param id The ID of the project to retrieve.
   * @returns The project with the specified ID.
   * @throws {ProjectNotFoundException} If the project with the given ID is not found.
   * @throws {HttpException} If an error occurs while fetching the project.
   */
  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    try {
      const project = await this.projectsService.findOne(id);
      if (!project) {
        throw new ProjectNotFoundException();
      }
      return project;
    } catch (error) {
      if (error instanceof ProjectNotFoundException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update a project by ID.
   * @param id The ID of the project to update.
   * @param updateProjectDto The data for updating the project.
   * @returns The updated project.
   */
  @Put(':id')
  async update(@Param('id') id: ObjectId, @Body(new ValidationPipe()) updateProjectDto: UpdateProjectDTO) {
    try {
      const project = await this.projectsService.update(id, updateProjectDto);
      if (!project) {
        throw new ProjectNotFoundException();
      }
      return project;
    } catch (error) {
      if (error instanceof ProjectNotFoundException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } 

  /**
   * Delete a project by ID.
   * @param id The ID of the project to delete.
   * @returns The deleted project.
   * @throws {ProjectNotFoundException} If the project with the given ID is not found.
   * @throws {ProjectDeletionException} If an error occurs while deleting the project.
   * @throws {HttpException} If an error occurs while fetching or deleting the project.
   */
  @Delete(':id')
  async remove(@Param('id') id: ObjectId) {
    try {
      const project = await this.projectsService.remove(id);
      if (!project) {
        throw new ProjectNotFoundException();
      }
      return project;
    } catch (error) {
      if (error instanceof ProjectNotFoundException) {
        throw error;
      }
      throw new ProjectDeletionException();
    }
  }

  /**
   * Add Contact to a project.
   * @param id The ID of the project to add proposal to.
   * @param ContactDTO The ID of the proposal to add.
   * @returns The updated project.
   */
  @Post(':id/addContact')
  async addContact(@Param('id') id: ObjectId, @Body(new ValidationPipe()) ContactDTO: ContactDTO) {
    try {
      const project = await this.projectsService.receiveProposal(id, ContactDTO);
      if (!project) {
        throw new ProjectNotFoundException();
      }
      return project;
    } catch (error) {
      if (error instanceof ProjectNotFoundException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
